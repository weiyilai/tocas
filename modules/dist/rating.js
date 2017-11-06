// Generated by CoffeeScript 2.0.0-beta4
// Rating

// 評分。
var Rating;

Rating = (function() {
  class Rating {
    constructor() {
      // 元素初始化函式。
      this.init = this.init.bind(this);
      // 元素摧毀函式。
      this.destroy = this.destroy.bind(this);
      // Set Rating

      // 設置指定評分數值，並且變動星星的圖示。
      this.setRating = this.setRating.bind(this);
      // 模組可用的方法。
      this.methods = this.methods.bind(this);
    }

    init() {
      var i, ref, set;
      // 如果這個評分是不可操作的，則加上停用類別。
      if (!this.$this.data('interactive')) {
        this.$this.addClass(this.className.DISABLED);
      }
      // 初始化評分元件的時候，依照設置來決定要在元件內產生幾顆星星元素。
      for (i = 1, ref = this.$this.data('maxRating'); 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
        $selector('<i>').addClass(this.className.ICON).appendTo(this.$this);
      }
      // 當使用者在圖示上觸控按著移動的時候。
      this.$this.on('touchmove.rating', (event) => {
        var $icon;
        // 取得目前觸控點位置的元素。
        $icon = $selector(document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY));
        // 如果觸控位置的元素跟當初開始觸控的元素不是同個評分元件則離開，
        // 這表示使用者已經滑到另一個評分元件了。
        if ($selector(event.target).parent().get() !== $icon.parent().get()) {
          return;
        }
        // 圖示自己跟之前的所有圖示都加上「已選擇」樣式。
        $icon.prevAll().addBack().addClass(this.className.SELECTED);
        // 移除圖示之後的所有「已選擇」樣式。
        $icon.nextAll().removeClass(this.className.SELECTED);
        // 保存最後一個觸控的圖示，這樣才能在觸控結束時取得是在哪個圖示結束觸控的。
        return this.$this.data('$lastIcon', $icon);
      });
      // 當使用者在圖示上放開觸控的時候。
      this.$this.find(this.selector.ICON).on('touchend.rating', (event) => {
        var $lastIcon, clearable, rating;
        // 取得是在哪個圖示放開觸控的。
        $lastIcon = this.$this.data('$lastIcon');
        // 如果沒有 touchmove 時所記錄的最後一個圖示元素則離開。
        if ($lastIcon === void 0) {
          return;
        }
        // 取得點擊的評分數值。
        rating = $lastIcon.index() + 1;
        // 如果目前的評分數值和點下去的ㄧ樣。
        if (rating === this.$this.data('rating')) {
          clearable = this.$this.data('clearable');
          // 如果這個評分元件允許重設評分，就來重設吧。
          // 又或者重設是自動模式，而這個元件內只有一個評分，那麼就允許重設。
          if (clearable === true || (clearable === 'auto' && this.$this.children().length === 1)) {
            // 重設評分為零。
            this.setRating(0);
          }
        } else {
          // 設置評分的分數。
          // 不然如果點的是其他的評分。
          this.setRating(rating);
        }
        // 重設最後的圖示元素。
        return this.$this.removeData('$lastIcon');
      });
      // 當滑鼠在圖示上移動的時候。
      this.$this.find(this.selector.ICON).on('mousemove.rating', () => {
        var isLast;
        isLast = this.$this.data('isLast');
        if (!isLast) {
          // 如果這個星星不是剛點擊的，我們就把這個星星和前面的星星
          // 加上「選取中」的樣式，讓使用者能分辨目前滑鼠所選取的星星數量和實際數量的差異。
          return $selector(event.target).prevAll().addBack().addClass(this.className.SELECTED);
        }
      });
      // 當滑鼠移出圖示的時候。
      this.$this.on('mouseout.rating', () => {
        // 移除所有圖示的「選取中」樣式。
        this.$this.children().removeClass(this.className.SELECTED);
        // 因為移出了圖示，所以沒有被點擊，把被點擊設置為 `false`。
        return this.$this.data('isLast', false);
      });
      // 設置評分的函式。
      set = (event) => {
        var clearable, rating;
        // 如果是觸控事件，又剛好在現在點擊的這個圖示上觸控，
        // 我們就不要觸發點擊事件，只觸發觸控事件，所以這個事件就離開。
        if (this.$this.data('$lastIcon') !== void 0 && this.$this.data('$lastIcon').get() === event.target) {
          return;
        }
        // 取得目前的評分數值還有點擊的評分數值。
        rating = $selector(event.target).index() + 1;
        // 如果目前的評分數值和點下去的ㄧ樣。
        if (rating === this.$this.data('rating')) {
          clearable = this.$this.data('clearable');
          // 如果這個評分元件允許重設評分，就來重設吧。
          // 又或者重設是自動模式，而這個元件內只有一個評分，那麼就允許重設。
          if (clearable === true || (clearable === 'auto' && this.$this.children().length === 1)) {
            // 重設評分為零。
            this.setRating(0);
          }
        } else {
          // 設置評分的分數。
          // 不然如果點的是其他的評分。
          this.setRating(rating);
        }
        // 因為被按下了，所以將被點擊設置為 `true`。
        return this.$this.data('isLast', true);
      };
      // 當滑鼠放開或是按下時。
      this.$this.find(this.selector.ICON).on('mouseup.rating', set);
      // 設置預設的評分數值。
      this.setRating(this.$this.data('rating'), false);
      return ts.fn;
    }

    destroy() {
      // 停用所有的監聽事件。
      // 移除所有星星。
      return this.$this.off('touchmove.rating').off('mouseout.rating').find(this.selector.ICON).remove();
    }

    async setRating(rating, callable = true) {
      var $ratingIcon;
      // 設置實際數值。
      this.$this.data('rating', rating);
      if (callable) {
        // 呼叫回呼函式。
        this.$this.data('onRate').call(this.$this.get(), rating);
      }
      // 如果評分是 0 的話。
      if (rating === 0) {
        await this.delay(300);
        // 就移除所有的選定星星圖示。
        return this.$this.find(this.selector.ICON).removeClass(`${this.className.ACTIVE} ${this.className.SELECTED}`);
      } else {
        // 不然就找到指定的星星，如 3 分就找第 3 個星星。
        $ratingIcon = this.$this.find(`.icon:nth-child(${rating})`);
        // 移除這個星星和前面星星的所有「選取中」樣式，並且增加「已啟用」樣式。
        $ratingIcon.prevAll().addBack().removeClass(this.className.SELECTED).addClass(this.className.ACTIVE);
        // 然後移除之後星星的選取與啟用樣式。
        return $ratingIcon.nextAll().removeClass(`${this.className.ACTIVE} ${this.className.SELECTED}`);
      }
    }

    methods() {
      return {
        // Disable

        // 停用指定評分，令使用者不得變更其數值。
        disable: () => {
          this.$this.addClass(this.className.DISABLED);
          return ts.fn;
        },
        // Enable

        // 啟用指定評分，讓使用者可以更改其數值。
        enable: () => {
          this.$this.removeClass(this.className.DISABLED);
          return ts.fn;
        },
        // Clear Rating

        // 清除、歸零指定評分。
        'clear rating': () => {
          this.setRating(0);
          return ts.fn;
        },
        // Get Rating

        // 取得指定評分數值。
        'get rating': () => {
          return this.$this.data('rating');
        },
        // Set Rating

        // 設置指定評分數值。
        'set rating': (rating) => {
          this.setRating(rating);
          return ts.fn;
        }
      };
    }

  };

  // 模組名稱。
  Rating.module = 'rating';

  // 模組屬性。
  Rating.prototype.props = {
    // 初期的評分數值。
    rating: 0,
    // 評分數值的最大上限。
    maxRating: 5,
    // 評分數值是否可由重新點擊一次而清除，照理來說如果評分只有一個星，這是被允許的。
    clearable: 'auto',
    // 評分數值是否可被改變。
    interactive: true,
    // 當評分數值更改時所呼叫的函式。
    onRate: function(value) {}
  };

  // 類別樣式名稱。
  Rating.prototype.className = {
    DISABLED: 'disabled',
    ICON: 'icon',
    SELECTED: 'selected',
    ACTIVE: 'active'
  };

  // 選擇器名稱。
  Rating.prototype.selector = {
    ICON: 'i'
  };

  return Rating;

})();

ts(Rating);
