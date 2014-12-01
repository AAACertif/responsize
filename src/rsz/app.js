goog.provide('rsz.App');

goog.require('rsz.Toolbar');
goog.require('rsz.Stage');
goog.require('rsz.Wysiwyg');


/**
 * @class
 */
class App {
  /**
   * @constructor
   * @param {Element} element
   */
  constructor(element) {

    /**
     * @type {Toolbar}
     */
    this.toolbar= new Toolbar(element.querySelector('#toolbar'));


    /**
     * @type {Stage}
     */
    this.stage = new Stage(element.querySelector('#stage'));


    /**
     * @type {Wysiwyg}
     */
    this.wysiwyg = new Wysiwyg(element.querySelector('#stage'));


    // bind components together
    this.toolbar.onSize = (w, h) => this.stage.setSize(w, h);
    this.toolbar.onMoveDown = () => this.wysiwyg.moveDown();
    this.toolbar.onMoveUp = () => this.wysiwyg.moveUp();
    this.wysiwyg.onSelect = () => this.toolbar.setSelection(this.wysiwyg.getSelected());

    // init
    this.toolbar.setDevice(Device.desktop);
  }


  /**
   * load the file
   * @param {string} url
   */
  importWebsite(url) {
    this.stage.setUrl(url).then((doc) => this.wysiwyg.init(doc));
  }
}

