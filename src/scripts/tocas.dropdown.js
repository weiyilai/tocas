class Dropdown {
    // #dropdowns 用以隨時更新頁面上有哪些存在的彈出式選單 ID，
    // 這個清單資料來自於有被指定在 [data-dropdown] 裡的名稱。
    #dropdowns = new Set();

    // attributeMutation
    attributeMutation = mutation => {};

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 當有新的節點被增加，就更新彈出式選單的清單。
        this.updateDropdowns();

        // 如果這個追加的 DOM 元素是一個會觸發彈出式選單的元素，就監聽其點擊事件。
        if (this.isDropdownTrigger(added_node)) {
            this.bindEventListener(added_node);
        }

        // 如果這個追加的 DOM 元素是一個彈出式選單容器，就監聽其選項點擊事件。
        if (this.isDropdown(added_node)) {
            this.bindItemEventListener(added_node);
        }
    };

    // isDropdownTrigger
    isDropdownTrigger = element => {
        return element.matches("[data-dropdown]");
    };

    // isDropdown
    isDropdown = element => {
        // 必須要有 .ts-dropdown 且 ID 有出現在其他元素的 data-dropdown 屬性裡面。
        return element.matches(`.ts-dropdown`) && this.#dropdowns.has(element.id);
    };

    // updateDropdowns
    updateDropdowns = () => {
        document.querySelectorAll("[data-dropdown]").forEach(element => {
            this.#dropdowns.add(element.dataset.dropdown);
        });
    }

    // position
    position = element => {
        return element.dataset.position || "bottom";
    };

    // windowClick
    windowClick = event => {
        // 取得這個視窗點擊最鄰近的 Dropdown 模組觸發元素。
        var closest_trigger = event.target.closest("[data-dropdown]");

        // 取得這個視窗點擊最鄰近的 Dropdown 容器本身。
        var closest_dropdown = event.target.closest(".ts-dropdown");

        // 如果這個點擊事件既沒有關聯任何觸發元素，也沒有在點擊任何 Dropdown 容器，
        // 那使用者應該就是在點擊其他東西，所以關閉所有頁面上可見的彈出式選單。
        if (closest_trigger === null && closest_dropdown === null) {
            document.querySelectorAll(".ts-dropdown").forEach(dropdown => {
                this.closeDropdown(dropdown);
            });
        }

        // 如果這個點擊事件是在點擊一個會開關 Dropdown 的觸發元素。
        if (closest_trigger !== null) {
            // 取得這個觸發元素原本會打開的 Dropdown 名稱。
            var name = closest_trigger.dataset.dropdown;

            // 透過該名稱搜尋對應的 Dropdown。
            var dropdown = document.getElementById(name)

            // 除了找到的這個對應 Dropdown 以外，關掉其他所有 Dropdown。
            this.closeDropdownsExcept(dropdown);
        }

        // 如果這個點擊事件是在點擊某個 Dropdown 容器或內部的項目。
        if (closest_dropdown !== null) {
            // 關閉這個 Dropdown 以外的其他所有 Dropdown。
            this.closeDropdownsExcept(closest_dropdown);
        }
    };

    // closeDropdownsExcept
    closeDropdownsExcept = excluded_dropdown => {
        document.querySelectorAll(".ts-dropdown").forEach(dropdown => {
            if (dropdown !== excluded_dropdown) {
                this.closeDropdown(dropdown);
            }
        });
    };

    // bindEventListener
    bindEventListener = element => {
        element.removeEventListener("click", this.clickEventListener);
        element.addEventListener("click", this.clickEventListener);
    };

    // bindItemEventListener
    bindItemEventListener = element => {
        element.removeEventListener("click", this.itemClickEventListener);
        element.addEventListener("click", this.itemClickEventListener);
    };

    // closeDropdown
    closeDropdown = dropdown => {
        // 如果這個元素不包含 `ts-dropdown` 或者也不是可見狀態，就忽略不計。
        if (!dropdown.classList.contains(".ts-dropdown") && !dropdown.classList.contains("is-visible")) {
            return;
        }

        // 如果這個選單不在清單裡，就不要在乎是否該關閉這個選單，
        // 因為這很有可能是 .ts-dropdown 但由使用者自行控制可見狀態。
        if (!this.#dropdowns.has(dropdown.id)) {
            return;
        }

        // 移除這個彈出式選單的可見狀態。
        dropdown.classList.remove("is-visible");

        // 如果這個彈出式選單有 FLoating UI 的清除函式，就呼叫該清除函式，
        // 然後重設對應的 CSS 變數。
        if (dropdown.tocas_dropdown !== undefined) {
            dropdown.tocas_dropdown();
            dropdown.tocas_dropdown = undefined;
            dropdown.style.removeProperty("--ts-dropdown-min-width");
            dropdown.style.removeProperty("--ts-dropdown-position");
        }
    };

    // itemClickEventListener
    itemClickEventListener = event => {
        // 取得這個點擊事件最鄰近的彈出式選單。
        var dropdown = event.target.closest(".ts-dropdown");

        // 如果找不到點擊事件最鄰近的選單項目，
        // 那可能點擊的不是項目而是其他容器裡的東西，那就忽略這個動作。
        if (event.target.closest(".item") === null) {
            return;
        }

        // 項目點擊成功，關閉這個彈出式選單。
        this.closeDropdown(dropdown);
    };

    // clickEventListener
    clickEventListener = event => {
        var element = event.target.closest("[data-dropdown]");

        // 取得這個觸發元素會切換的彈出式選單名稱。
        var name = element.dataset.dropdown;

        // 透過命名空間搜尋對應的彈出式選單。
        var target = document.getElementById(name)

        // 取得目標選單的偏好位置設定。
        var position = this.position(target);

        // 如果那個選單有 Floating UI 清除函式，就先清除並且重設相關位置設定。
        if (target.tocas_dropdown !== undefined) {
            target.tocas_dropdown();
            target.tocas_dropdown = undefined;
            target.style.removeProperty("--ts-dropdown-min-width");
            target.style.removeProperty("--ts-dropdown-position");
        }

        // 切換目標彈出式選單的可見度。
        target.classList.toggle("is-visible");

        // 如果目標選單現在不再可見，就是被隱藏了，那就不需要執行接下來的行為。
        if (!target.classList.contains("is-visible")) {
            return;
        }

        // 設定選單的最小寬度和絕對位置，至少要跟切換觸發元素一樣寬。
        target.style.setProperty("--ts-dropdown-min-width", `${element.getBoundingClientRect().width}px`);
        target.style.setProperty("--ts-dropdown-position", "fixed");

        // 透過 Floating UI 來觸發浮動顯示。
        target.tocas_dropdown = TocasFloatingUIDOM.autoUpdate(element, target, () => {
            TocasFloatingUIDOM.computePosition(element, target, {
                strategy: "fixed",
                placement: position,
                middleware: [
                    // 選單某面如果沒有空間就被擠兌到另一邊。
                    TocasFloatingUIDOM.flip({
                        crossAxis: false,
                    }),

                    // 偏移選單的上下垂直留點空隙。
                    TocasFloatingUIDOM.offset(8),

                    // 選單會被螢幕左右推移，避免超出畫面空間。
                    TocasFloatingUIDOM.shift(),
                ],
            }).then(({ x, y }) => {
                // 賦予彈出式選單絕對位置。
                Object.assign(target.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });
            });
        });
    };
}

window.tocas_modules = [...window.tocas_modules, new Dropdown()]