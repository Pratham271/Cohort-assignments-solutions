/*! @name videojs-sprite-thumbnails @version 2.2.1 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.videojsSpriteThumbnails = factory(global.videojs));
})(this, (function (videojs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

  /**
   * Set up sprite thumbnails for a player.
   *
   * @function spriteThumbs
   * @param {Player} player
   *        The current player instance.
   * @param {Plugin} plugin
   *        The current spriteThumbnails plugin instance.
   * @param {Object} options
   *        Plugin configuration options.
   */
  const spriteThumbs = (player, plugin, options) => {
    const navigator = window.navigator;
    const dom = videojs__default["default"].dom;
    const obj = videojs__default["default"].obj;
    const merge = obj.merge;
    const log = plugin.log;
    const controls = player.controlBar;

    // default control bar component tree is expected
    // https://docs.videojs.com/tutorial-components.html#default-component-tree
    const progress = controls && controls.progressControl;
    const seekBar = progress && progress.seekBar;
    const mouseTimeTooltip = seekBar && seekBar.mouseTimeDisplay && seekBar.mouseTimeDisplay.timeTooltip;
    const tooltipEl = mouseTimeTooltip && mouseTimeTooltip.el();
    const tooltipStyleOrig = tooltipEl && tooltipEl.style;
    const getUrl = idx => {
      const urlArray = options.urlArray;
      return urlArray.length ? urlArray[idx] : options.url.replace('{index}', options.idxTag(idx));
    };
    const hijackMouseTooltip = evt => {
      const seekBarEl = seekBar.el();
      const playerWidth = player.currentWidth();
      const duration = player.duration();
      const interval = options.interval;
      const columns = options.columns;
      const responsive = options.responsive;
      const rowDuration = interval * columns;
      // spriteDuration is needed to calculate idx
      const spriteDuration = rowDuration * (options.rows || Math.ceil(duration / rowDuration));
      let position = dom.getPointerPosition(seekBarEl, evt).x * duration;
      // for single sprites idx is always 0
      const idx = Math.floor(position / spriteDuration);

      // if (idx == 0) position /= interval
      position = (position - spriteDuration * idx) / interval;
      const scaleFactor = responsive && playerWidth < responsive ? playerWidth / responsive : 1;
      const scaledWidth = options.width * scaleFactor;
      const scaledHeight = options.height * scaleFactor;
      const cleft = Math.floor(position % columns) * -scaledWidth;
      const ctop = Math.floor(position / columns) * -scaledHeight;
      const controlsTop = dom.findPosition(controls.el()).top;
      const seekBarTop = dom.findPosition(seekBarEl).top;
      // top of seekBar is 0 position
      const topOffset = -scaledHeight - Math.max(0, seekBarTop - controlsTop);
      const tooltipStyle = {
        backgroundImage: `url("${getUrl(idx)}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${cleft}px ${ctop}px`,
        backgroundSize: `${scaledWidth * columns}px auto`,
        top: `${topOffset}px`,
        color: '#fff',
        textShadow: '1px 1px #000',
        // box-sizing: border-box inherited from .video-js
        border: '1px solid #000',
        // border should not overlay thumbnail area
        width: `${scaledWidth + 2}px`,
        height: `${scaledHeight + 2}px`
      };
      obj.each(tooltipStyle, (value, key) => {
        tooltipEl.style[key] = value;
      });
    };
    const intCheck = opt => {
      const val = options[opt];
      const min = opt !== 'rows' ? 1 : 0;
      if (parseInt(val, 10) !== val || val < min) {
        log(`${opt} must be an integer greater than ${min - 1}`);
        return false;
      }
      return true;
    };
    const downlinkCheck = () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const downlink = options.downlink;
      if (connection && connection.downlink < downlink) {
        log.warn(`connection.downlink < ${downlink}`);
        return false;
      }
      return true;
    };
    plugin.on('statechanged', () => {
      const pstate = plugin.state;
      const spriteEvents = ['mousemove', 'touchmove'];
      const debug = log.debug;
      if (pstate.ready) {
        debug('ready to show thumbnails');
        progress.on(spriteEvents, hijackMouseTooltip);
      } else {
        if (!options.url && !options.urlArray.length) {
          log('no urls given');
        }
        debug('resetting');
        progress.off(spriteEvents, hijackMouseTooltip);
        tooltipEl.style = tooltipStyleOrig;
      }
      player.toggleClass('vjs-thumbnails-ready', pstate.ready);
    });
    const init = () => {
      // if present, merge source config with current config
      const plugName = plugin.name;
      const thumbSource = player.currentSources().find(source => {
        return source.hasOwnProperty(plugName);
      });
      let srcOpts = thumbSource && thumbSource[plugName];
      if (srcOpts) {
        // empty config unsets url and urlArray
        // force urlArray or url according to precedence
        const urlArray = srcOpts.urlArray;
        if (!Object.keys(srcOpts).length) {
          srcOpts = {
            url: '',
            urlArray: []
          };
          log('disabling plugin');
        } else if (urlArray && urlArray.length) {
          srcOpts.url = '';
        } else if (srcOpts.url) {
          srcOpts.urlArray = [];
        }
        plugin.options = options = merge(options, srcOpts);
      }
      plugin.setState({
        ready: !!(mouseTimeTooltip && (options.urlArray.length || options.url) && intCheck('width') && intCheck('height') && intCheck('columns') && intCheck('rows') && downlinkCheck())
      });
    };
    player.on('loadstart', init);
    init();
    player.addClass('vjs-sprite-thumbnails');
  };

  var version = "2.2.1";

  const Plugin = videojs__default["default"].getPlugin('plugin');

  /**
   * Default plugin options
   *
   * @param {String} url
   *        Location of image(s). Must be set by user. For multiple images the
   *        filename must contain the template {index} which is replaced by the
   *        zero based index number of the image in the sequence. Default: ''.
   * @param {Array} urlArray
   *        Array of image locations. Default: [].
   * @param {Integer} width
   *        Width of a thumbnail in pixels. Must be set by user. Default: 0.
   * @param {Integer} height
   *        Height of a thumbnail in pixels. Must be set by user. Default: 0.
   * @param {Integer} columns
   *        Number of thumbnail columns per image. Must be set by user.
   * @param {Integer} rows
   *        Number of thumbnail rows per image. If set to greater than 0, the
   *        plugin will expect a sequence of images. Default: 0.
   * @param {Number} interval
   *        Interval between thumbnail frames in seconds. Default: 1.
   * @param {Function} idxTag
   *        Function determining the substitiuton of the {index} template in the
   *        current url. Default: returns index as is.
   * @param {Integer} responsive
   *        Width of player below which thumbnails are reponsive. Default: 600.
   * @param {Number} downlink
   *        Minimum of NetworkInformation downlink where supported. Default: 1.5.
   *        https://developer.mozilla.org/docs/Web/API/NetworkInformation/downlink
   */
  const defaults = {
    url: '',
    idxTag(i) {
      return i;
    },
    urlArray: [],
    width: 0,
    height: 0,
    columns: 0,
    rows: 0,
    interval: 1,
    responsive: 600,
    downlink: 1.5
  };

  /**
   * An advanced Video.js plugin. For more information on the API
   *
   * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
   */
  class SpriteThumbnails extends Plugin {
    /**
     * Create a SpriteThumbnails plugin instance.
     *
     * @param  {Player} player
     *         A Video.js Player instance.
     *
     * @param  {Object} [options]
     *         An optional options object.
     */
    constructor(player, options) {
      // the parent class will add player under this.player
      super(player, options);
      this.options = videojs__default["default"].obj.merge(defaults, options);
      this.player.ready(() => {
        spriteThumbs(this.player, this, this.options);
      });
    }
  }

  // Define default values for the plugin's `state` object here.
  SpriteThumbnails.defaultState = {
    ready: false
  };

  // Include the version number.
  SpriteThumbnails.VERSION = version;

  // Register the plugin with video.js.
  videojs__default["default"].registerPlugin('spriteThumbnails', SpriteThumbnails);

  return SpriteThumbnails;

}));
