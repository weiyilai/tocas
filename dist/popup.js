// Generated by CoffeeScript 2.0.0-beta4
(function() {
  // ------------------------------------------------------------------------
  // 變數與常數設置
  // ------------------------------------------------------------------------

  // 模組名稱。
  var Attribute, ClassName, EVENT_NAMESPACE, Error, Event, MODULE_NAMESPACE, Metadata, NAME, Position, Selector, Settings, duration;

  NAME = 'popup';

  // 模組事件鍵名。
  EVENT_NAMESPACE = `.${NAME}`;

  // 模組命名空間。
  MODULE_NAMESPACE = `module-${NAME}`;

  // 模組設定。
  Settings = {
    // 消音所有提示，甚至是錯誤訊息。
    silent: false,
    // 顯示除錯訊息。
    debug: true,
    // 監聽 DOM 結構異動並自動重整快取。
    observeChanges: true,
    // 欲使用的彈出式訊息元素選擇器（如果已經有先建立好的話），`false` 的話則是即時產生。
    popup: false,
    // 同時是否僅能有一個彈出式訊息出現在螢幕上。
    exclusive: false,
    // 彈出式訊息的邊界元素，彈出式訊息會試圖不要超過這個元素。
    boundary: 'body',
    // 即時產生的彈出式訊息應該要被擺置在哪個元素內。
    context: 'body',
    // 此彈出式訊息偵測畫面是否有捲動的元素選擇器，如果指定元素有捲動事件則會自動隱藏此彈出式訊息。
    scrollContext: window,
    // 如果有指定邊緣選擇器，彈出訊息則會試著依靠這個父元素的邊緣，適合用於表格的標頭等。
    edgeContext: false,
    // 彈出式訊息出現的位置，分別是 `垂直 水平`（如：`top left`、`bottom right`）。
    position: 'auto',
    // 是否要將彈出式訊息產生在目標元素的節點後，這讓使用者能在 CSS 選擇器中以 `.elem + .popup` 方便樣式更改。
    inline: false,
    // 欲觸發彈出式訊息的事件，如：`click`、`hover`、`focus`。
    on: 'hover',
    // 觸發的延遲毫秒數。
    delay: {
      // 欲顯示彈出式訊息前所需的毫秒數。
      show: 50,
      // 隱藏彈出式訊息前所等待的毫秒數。
      hide: 0
    },
    // 過場動畫。
    transition: 'auto',
    // 過場動畫的演繹毫秒時間。
    duration: 'auto',
    // 游標是否能在彈出式訊息遊走，如：導覽式彈出選單。
    hoverable: false,
    // 是否能在點擊彈出式訊息以外的地方自動關閉。
    closable: true,
    // 是否要在指定捲動時自動隱藏此彈出式訊息。
    hideOnScroll: 'auto',
    // 是否帶有指標外觀。
    pointing: true,
    // 是否為反色外觀。
    inverted: false,
    // 大小尺寸。
    size: 'medium',
    // 目標元素選擇器，彈出式訊息會以這個元素為主。
    target: false,
    // 欲套用的樣式名稱，以空白分隔。
    variation: false,
    // 內容純文字。
    content: false,
    // 標題純文字。
    title: false,
    // 彈出式訊息的 HTML 內容，如果採用此屬性則會忽略 `content` 與 `title`。
    html: false,
    // 當彈出式訊息被建立時所會呼叫的回呼函式。
    onCreate: () => {},
    // 當彈出式訊息不再被需要且從頁面上移除時所會呼叫的回呼函式。
    onRemove: () => {},
    // 當彈出式訊息開始顯示時所會呼叫的回呼函式，回傳 `false` 將會停止顯示。
    onShow: () => {
      return true;
    },
    // 當彈出式訊息動畫結束並顯示在畫面上時所會呼叫的回呼函式。
    onVisible: () => {},
    // 當彈出式訊息開始消失時所會呼叫的回呼函式，回傳 `false` 將會避免消失。
    onHide: () => {
      return true;
    },
    // 當彈出式訊息已經完全消失時所會呼叫的回呼函式。
    onHidden: () => {},
    // 當彈出式訊息無法在畫面上產生或放置（不合適尺寸）時所會呼叫的回呼函式。
    onUnplaceable: () => {}
  };

  // 事件名稱。
  Event = {
    CREATE: `create${EVENT_NAMESPACE}`,
    REMOVE: `remove${EVENT_NAMESPACE}`,
    SHOW: `show${EVENT_NAMESPACE}`,
    VISIBLE: `visible${EVENT_NAMESPACE}`,
    HIDE: `hide${EVENT_NAMESPACE}`,
    HIDDEN: `hidden${EVENT_NAMESPACE}`,
    UNPLACEABLE: `unplaceable${EVENT_NAMESPACE}`,
    CLICK: `click${EVENT_NAMESPACE}`,
    FOCUS: `focus${EVENT_NAMESPACE}`,
    SCROLL: `scroll${EVENT_NAMESPACE}`,
    MOUSEMOVE: `mousemove${EVENT_NAMESPACE}`,
    MOUSEENTER: `mouseenter${EVENT_NAMESPACE}`,
    MOUSELEAVE: `mouseleave${EVENT_NAMESPACE}`,
    MOUSEOUT: `mouseout${EVENT_NAMESPACE}`,
    ANIMATIONEND: 'animationend'
  };

  // 樣式名稱。
  ClassName = {
    TOP: 'top',
    LEFT: 'left',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    CENTER: 'center',
    VISIBLE: 'visible',
    ANIMATING: 'animating',
    HIDDEN: 'hidden',
    CUSTOM: 'custom'
  };

  // 位置。
  Position = {
    AUTO: 'auto',
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
    CENTER: 'center',
    TOP_LEFT: 'top left',
    TOP_CENTER: 'top center',
    TOP_RIGHT: 'top right',
    BOTTOM_LEFT: 'bottom left',
    BOTTOM_CENTER: 'bottom center',
    BOTTOM_RIGHT: 'bottom right',
    RIGHT_TOP: 'right top',
    RIGHT_CENTER: 'right center',
    RIGHT_BOTTOM: 'right bottom',
    LEFT_TOP: 'left top',
    LEFT_CENTER: 'left center',
    LEFT_BOTTOM: 'left bottom'
  };

  // 中繼資料。
  Metadata = {
    SHOW_TIMER: 'showTimer',
    HIDE_TIMER: 'hideTimer'
  };

  // 選擇器名稱。
  Selector = {
    BODY: 'body'
  };

  // 元素標籤。
  Attribute = {
    CONTENT: 'data-content',
    HTML: 'data-html',
    TITLE: 'data-title',
    VARIATION: 'data-variation',
    TRANSITION: 'data-popup-transition',
    POSITION: 'data-position'
  };

  // 錯誤訊息。
  Error = {};

  // 過場動畫毫秒。
  duration = 200;

  // ------------------------------------------------------------------------
  // 模組註冊
  // ------------------------------------------------------------------------
  ts.register({NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) => {
    var $body, $boundary, $popup, $scrollContext, boundary, module, offset, scrollContext;
    // ------------------------------------------------------------------------
    // 區域變數
    // ------------------------------------------------------------------------
    $body = ts(Selector.BODY);
    $popup = ts();
    $boundary = ts();
    boundary = null;
    $scrollContext = ts();
    scrollContext = null;
    offset = 20;
    // ------------------------------------------------------------------------
    // 模組定義
    // ------------------------------------------------------------------------
    return module = {
      show: (callback) => {
        $this.removeTimer(Metadata.SHOW_TIMER);
        $this.removeTimer(Metadata.HIDE_TIMER);
        if (module.is.animating()) {
          return;
        }
        if (module.is.visible()) {
          return;
        }
        module.calculate.popup.position();
        module.animate.show(() => {
          module.set.animating(false);
          if (callback != null) {
            return callback.call();
          }
        });
        return $allModules;
      },
      hide: (callback) => {
        $this.removeTimer(Metadata.SHOW_TIMER);
        $this.removeTimer(Metadata.HIDE_TIMER);
        if (module.is.animating()) {
          return;
        }
        if (module.is.hidden()) {
          return;
        }
        module.animate.hide(() => {
          module.set.animating(false);
          if (callback != null) {
            return callback.call();
          }
        });
        return $allModules;
      },
      hideAll: () => {},
      get: {
        popup: () => {
          return $popup.get();
        },
        distance: () => {
          var bottom, boundaryBottom, boundaryHeight, boundaryLeft, boundaryRect, boundaryRight, boundaryTop, boundaryWidth, left, rect, right, top;
          rect = $this.rect();
          boundaryRect = $boundary.rect();
          boundaryTop = boundaryRect.top;
          boundaryLeft = boundaryRect.left;
          boundaryBottom = boundaryRect.bottom;
          boundaryHeight = boundaryRect.height;
          boundaryWidth = boundaryRect.width;
          boundaryRight = boundaryRect.right;
          if ($boundary.is('body')) {
            boundaryTop = 0;
            boundaryLeft = 0;
            boundaryBottom = 0;
            boundaryWidth = boundary.clientWidth;
            boundaryHeight = boundary.clientHeight;
            boundaryRight = 0;
          }
          top = rect.top - boundaryTop;
          left = rect.left - boundaryLeft;
          right = (boundaryLeft + boundaryWidth) - (rect.left + rect.width);
          bottom = (boundaryTop + boundaryHeight) - (rect.top + rect.height);
          if ($boundary.is('body')) {
            right = boundaryWidth - (rect.left + rect.width);
            bottom = boundaryHeight - (rect.top + rect.height);
          }
          return {
            top: top,
            left: left,
            right: right,
            bottom: bottom
          };
        },
        position: () => {
          return $popup.attr(Attribute.POSITION);
        }
      },
      calculate: {
        popup: {
          position: () => {
            var bottom, bottomCenterOK, bottomLeftOK, bottomRightOK, left, leftCenterOK, popupHeight, popupRect, popupWidth, position, rect, right, rightCenterOK, top, topCenterOK, topLeftOK, topRightOK;
            ({top, left, right, bottom} = module.get.distance());
            rect = $this.rect();
            popupRect = $popup.rect();
            popupWidth = popupRect.width;
            popupHeight = popupRect.height;
            position = '';
            topCenterOK = top > popupHeight && right > popupWidth / 2 && left > popupWidth / 2;
            topLeftOK = top > popupHeight && right > popupWidth;
            topRightOK = top > popupHeight && left > popupWidth;
            bottomCenterOK = bottom > popupHeight && right > popupWidth / 2 && left > popupWidth / 2;
            bottomLeftOK = bottom > popupHeight && right > popupWidth;
            bottomRightOK = bottom > popupHeight && left > popupWidth;
            //leftCenterOK   = (top < popupHeight or bottom < popupHeight) and left > popupWidth
            //rightCenterOK  = (top < popupHeight or bottom < popupHeight) and right > popupWidth
            leftCenterOK = (top > popupHeight || bottom > popupHeight) && left > popupWidth;
            rightCenterOK = (top > popupHeight || bottom > popupHeight) && right > popupWidth;
            // OVERWRITE IF SETTING
            if (settings.position !== 'auto') {
              switch (settings.position) {
                case Position.TOP_CENTER:
                  if (topCenterOK) {
                    position = Position.TOP_CENTER;
                  }
                  break;
                case Position.TOP_LEFT:
                  if (topLeftOK) {
                    position = Position.TOP_LEFT;
                  }
                  break;
                case Position.TOP_RIGHT:
                  if (topRightOK) {
                    position = Position.TOP_RIGHT;
                  }
                  break;
                case Position.BOTTOM_CENTER:
                  if (bottomCenterOK) {
                    position = Position.BOTTOM_CENTER;
                  }
                  break;
                case Position.BOTTOM_LEFT:
                  if (bottomLeftOK) {
                    position = Position.BOTTOM_LEFT;
                  }
                  break;
                case Position.BOTTOM_RIGHT:
                  if (bottomRightOK) {
                    position = Position.BOTTOM_RIGHT;
                  }
                  break;
                case Position.LEFT_CENTER:
                  if (leftCenterOK) {
                    position = Position.LEFT_CENTER;
                  }
                  break;
                case Position.RIGHT_CENTER:
                  if (rightCenterOK) {
                    position = Position.RIGHT_CENTER;
                  }
              }
            }
            console.log({top, left, right, bottom, popupWidth, popupHeight, topCenterOK, topLeftOK, topRightOK, bottomCenterOK, bottomLeftOK, bottomRightOK, leftCenterOK, rightCenterOK});
            if (position === '') {
              switch (false) {
                case !topCenterOK:
                  position = Position.TOP_CENTER;
                  break;
                case !topLeftOK:
                  position = Position.TOP_LEFT;
                  break;
                case !topRightOK:
                  position = Position.TOP_RIGHT;
                  break;
                case !bottomCenterOK:
                  position = Position.BOTTOM_CENTER;
                  break;
                case !bottomLeftOK:
                  position = Position.BOTTOM_LEFT;
                  break;
                case !bottomRightOK:
                  position = Position.BOTTOM_RIGHT;
                  break;
                case !leftCenterOK:
                  position = Position.LEFT_CENTER;
                  break;
                case !rightCenterOK:
                  position = Position.RIGHT_CENTER;
              }
            }
            $popup.attr(Attribute.POSITION, position);
            top = element.offsetTop;
            left = element.offsetLeft;
            switch (position) {
              case Position.TOP_CENTER:
                $popup.css({
                  left: (left + rect.width / 2) - popupRect.width / 2,
                  top: top - popupRect.height // - offset
                });
                break;
              case Position.TOP_LEFT:
                $popup.css({
                  left: left,
                  top: top - popupRect.height // - offset
                });
                break;
              case Position.TOP_RIGHT:
                $popup.css({
                  left: left - popupRect.width + rect.width,
                  top: top - popupRect.height // - offset
                });
                break;
              case Position.BOTTOM_CENTER:
                $popup.css({
                  left: (left + rect.width / 2) - popupRect.width / 2,
                  top: top + rect.height // + offset
                });
                break;
              case Position.BOTTOM_LEFT:
                $popup.css({
                  left: left,
                  top: top + rect.height // + offset
                });
                break;
              case Position.BOTTOM_RIGHT:
                $popup.css({
                  left: left - popupRect.width + rect.width,
                  top: top + rect.height // + offset
                });
                break;
              case Position.LEFT_CENTER:
                $popup.css({
                  left: left - popupRect.width,
                  top: (top + rect.height / 2) - popupRect.height / 2
                });
                break;
              case Position.RIGHT_CENTER:
                $popup.css({
                  left: left + rect.width, // + offset
                  top: (top + rect.height / 2) - popupRect.height / 2
                });
            }
            if (settings.position === 'auto') {
              return module.set.position(position);
            }
          }
        }
      },
      toggle: () => {},
      change: {
        title: (title) => {},
        content: (content) => {},
        html: (html) => {
          return $popup.html(html);
        }
      },
      animate: {
        show: (callback) => {
          return $popup.addClass(`${ClassName.VISIBLE} ${ClassName.ANIMATING}`).off(Event.ANIMATIONEND).one(Event.ANIMATIONEND, () => {
            if (callback != null) {
              return callback.call();
            }
          }).emulate(Event.ANIMATIONEND, duration);
        },
        hide: (callback) => {
          return $popup.removeClass(ClassName.VISIBLE).addClass(ClassName.ANIMATING).one(Event.ANIMATIONEND, () => {
            if (callback != null) {
              return callback.call();
            }
          }).emulate(Event.ANIMATIONEND, duration);
        }
      },
      is: {
        visible: () => {
          return $popup.hasClass(ClassName.VISIBLE);
        },
        hidden: () => {
          return !module.is.visible();
        },
        animating: () => {
          return $popup.hasClass(ClassName.ANIMATING);
        },
        hoverable: () => {
          return settings.hoverable === true;
        }
      },
      create: {
        popup: () => {
          var $content, $title, attributeContent, attributeHTML, attributeTitle, attributeVariation, content, html, title, variation;
          variation = settings.variation || '';
          content = settings.content || '';
          html = settings.html || '';
          title = settings.title || '';
          attributeVariation = $this.attr(Attribute.VARIATION);
          attributeContent = $this.attr(Attribute.CONTENT);
          attributeTitle = $this.attr(Attribute.TITLE);
          attributeHTML = $this.attr(Attribute.HTML);
          if (attributeVariation !== null) {
            variation = attributeVariation;
          }
          if (attributeContent !== null) {
            content = attributeContent;
          }
          if (attributeTitle !== null) {
            title = attributeTitle;
          }
          if (attributeHTML !== null) {
            html = attributeHTML;
          }
          $popup = ts('<div>').addClass('ts popup').addClass(variation);
          if (html !== '') {
            $popup.html(html);
          }
          if (content !== '') {
            $content = ts('<div>').addClass('content').html(content);
            $title = ts('<div>').addClass('title').html(title);
            if (title !== '') {
              $popup.append($title).append($content);
            } else {
              $popup.append($content);
            }
          }
          return $popup.insertAfter($this);
        }
      },
      exists: () => {},
      repaint: () => {
        return $popup.repaint();
      },
      reposition: () => {},
      set: {
        position: (position) => {
          return $popup.attr(Attribute.POSITION, position);
        },
        coordinate: (x, y) => {
          return $popup.css({
            top: x,
            left: y
          });
        },
        width: (width) => {
          return $popup.css({
            width: width
          });
        },
        animating: (value) => {
          if (value) {
            return $popup.addClass(ClassName.ANIMATING);
          } else {
            return $popup.removeClass(ClassName.ANIMATING);
          }
        }
      },
      remove: {
        popup: () => {}
      },
      trigger: () => {},
      bind: {
        hover: () => {
          return $body.on(Event.MOUSEMOVE, (event) => {
            var $pointElement, pointElement, popupElement, popupRect, rect;
            if (!$popup.exists()) {
              return;
            }
            rect = $this.rect();
            $pointElement = ts.fromPoint(event.clientX, event.clientY);
            pointElement = $pointElement.get();
            popupElement = $popup.get();
            popupRect = $popup.rect();
            if ($this.is(pointElement) || $this.contains(pointElement)) {
              $this.removeTimer(Metadata.HIDE_TIMER);
              if (!$this.hasTimer(Metadata.SHOW_TIMER)) {
                $this.setTimer({
                  name: Metadata.SHOW_TIMER,
                  callback: module.show,
                  interval: settings.delay.show,
                  looping: false,
                  visible: true
                });
              }
              return;
            }
            if (!settings.hoverable) {
              $this.removeTimer(Metadata.SHOW_TIMER);
              if (!$this.hasTimer(Metadata.HIDE_TIMER)) {
                $this.setTimer({
                  name: Metadata.HIDE_TIMER,
                  callback: module.hide,
                  interval: settings.delay.hide,
                  looping: false,
                  visible: true
                });
              }
              return;
            }
            if ($this.is(popupElement)) {
              $this.removeTimer(Metadata.HIDE_TIMER);
              return;
            }
            if ($this.contains(popupElement)) {
              $this.removeTimer(Metadata.HIDE_TIMER);
              return;
            }
            if ($popup.contains(pointElement)) {
              $this.removeTimer(Metadata.HIDE_TIMER);
              return;
            }
            switch (module.get.position()) {
              case Position.TOP_LEFT:
              case Position.TOP_CENTER:
              case Position.TOP_RIGHT:
                if (event.clientY > popupRect.bottom && event.clientY < rect.top && event.clientX < popupRect.right && event.clientX > popupRect.left) {
                  return;
                }
                break;
              case Position.LEFT_TOP:
              case Position.LEFT_CENTER:
              case Position.LEFT_BOTTOM:
                if (event.clientY < popupRect.bottom && event.clientY > popupRect.top && event.clientX < rect.left && event.clientX > popupRect.right) {
                  return;
                }
                break;
              case Position.RIGHT_TOP:
              case Position.RIGHT_CENTER:
              case Position.RIGHT_BOTTOM:
                if (event.clientY < popupRect.bottom && event.clientY > popupRect.top && event.clientX < popupRect.left && event.clientX > rect.right) {
                  return;
                }
                break;
              case Position.BOTTOM_LEFT:
              case Position.BOTTOM_CENTER:
              case Position.BOTTOM_RIGHT:
                if (event.clientY > rect.bottom && event.clientY < popupRect.top && event.clientX < popupRect.right && event.clientX > popupRect.left) {
                  return;
                }
            }
            $this.removeTimer(Metadata.SHOW_TIMER);
            if (!$this.hasTimer(Metadata.HIDE_TIMER)) {
              return $this.setTimer({
                name: Metadata.HIDE_TIMER,
                callback: module.hide,
                interval: settings.delay.hide,
                looping: false,
                visible: true
              });
            }
          });
        },
        click: () => {
          return $body.on(Event.CLICK, (event) => {
            var $pointElement, pointElement;
            $pointElement = ts.fromPoint(event.clientX, event.clientY);
            pointElement = $pointElement.get();
            if (!$this.is(pointElement) && !$popup.contains(pointElement) && settings.closable) {
              module.hide();
              return;
            }
            if (!$this.is(pointElement)) {
              return;
            }
            if (module.is.hidden()) {
              return module.show();
            } else {
              return module.hide();
            }
          });
        },
        focus: () => {},
        scroll: () => {
          return $scrollContext.on(Event.SCROLL, () => {
            return module.hide();
          });
        },
        events: () => {}
      },
      // ------------------------------------------------------------------------
      // 基礎方法
      // ------------------------------------------------------------------------
      initialize: () => {
        var $next;
        debug('初始化彈出式訊息', element);
        $next = $this.next();
        if ($next.is('.ts.popup')) {
          $popup = $next;
        }
        if (!$popup.exists()) {
          module.create.popup();
        }
        if (settings.size !== 'medium') {
          $popup.removeClass('mini tiny small medium large big huge massive');
          $popup.addClass(settings.size);
        }
        if (settings.size !== 'medium') {
          $popup.removeClass('mini tiny small medium large big huge massive');
          $popup.addClass(settings.size);
        }
        if (settings.hoverable) {
          $popup.addClass('hoverable');
        }
        if ($this.attr(Attribute.POSITION) !== null) {
          settings.position = $this.attr(Attribute.POSITION);
          $popup.attr(Attribute.POSITION, settings.position);
        }
        if (settings.transition !== 'auto') {
          $popup.attr(Attribute.TRANSITION, settings.transition);
          if (settings.duration === 'auto') {
            switch (settings.transition) {
              case 'fade':
                duration = 300;
            }
          }
        }
        if (settings.inverted === true) {
          $popup.addClass('inverted');
        }
        if (settings.pointing === true) {
          $popup.addClass('pointing');
        }
        $boundary = $this.closest(settings.boundary);
        boundary = $boundary.get();
        $scrollContext = ts(settings.scrollContext);
        scrollContext = $scrollContext.get();
        module.bind.events();
        switch (settings.on) {
          case 'hover':
            module.bind.hover();
            break;
          case 'click':
            module.bind.click();
            break;
          case 'focus':
            module.bind.focus();
        }
        if (settings.hideOnScroll === 'auto') {
          if (settings.on === 'hover') {
            module.bind.scroll();
          }
        }
        if (settings.hideOnScroll === true) {
          return module.bind.scroll();
        }
      },
      instantiate: () => {
        return debug('實例化彈出式訊息', element);
      },
      refresh: () => {
        return $allModules;
      },
      destroy: () => {
        debug('摧毀彈出式訊息', element);
        $this.removeData(MODULE_NAMESPACE).off(EVENT_NAMESPACE);
        return $allModules;
      }
    };
  });

}).call(this);
