<script src="store.js"></script>
<script>
import { config } from "./utils/config";

var base = '';
console.log("config");

console.log(config);

if(config.isGeodidalab) {
  base = 'https://dev.geodidalab.unito.it/api/';
} else {
  base = 'https://dev.istitutomosso.unito.it/api/';
}

export default {
  PRODUCTION: false,
  DEBUGGING: false,
  baseUrl_Position: base + 'mapping_markers?radius_unit=km&address=',
  baseUrl_items: base + 'items',
  baseUrl_media: base + 'media',
  baseUrl_itemsOfClass: base + 'items?fulltext_search=&property[0][type]=eq&resource_class_id[]=',

  defaultError: function (vueObj, response) {
    if (response.status == 404) {
      var current = location.href;
      vueObj.$router.replace("/notfound");
    } else {
      alert("Errore nella richiesta")
      //console.error(response);
    }
  },

  /**
   * Gets items given its Class id.
   * @param {VueObject} vueObj: the caller Vue object
   * @param {number} id: class id od the item
   * @callback callback. What to do with the item.
   * @callback errorCallback=this.defaultError. What to do if an error occurred.
   */
  getElemsByClass: function (vueObj, id, callback, errorCallback = this.defaultError) {
    var url = this.baseUrl_itemsOfClass + id
    if (vueObj.$store.getters.getCached[url] !== undefined) {
      callback(vueObj.$store.getters.getCached[url])
    } else {
      vueObj.$http.get(url).then(
          response => {
            vueObj.$store.commit('addCachedUrl', [url, response]);
            callback(response)
          },
          response => {
            errorCallback(vueObj, response);
          }
      );
    }
  },


  /**
   * Gets an item given its id.
   * @param {VueObject} vueObj: the caller Vue object
   * @param {number} id
   * @callback callback. What to do with the item.
   * @callback errorCallback=this.defaultError. What to do if an error occurred.
   */
  getElemById: function (vueObj, id, callback, errorCallback = this.defaultError) {
    var url = this.baseUrl_items + '/' + id
    if (vueObj.$store.getters.getCached[url] !== undefined) {
      callback(vueObj.$store.getters.getCached[url])
    } else {
      vueObj.$http.get(url).then(
          response => {
            vueObj.$store.commit('addCachedUrl', [url, response]);
            callback(response)
          },
          response => {
            errorCallback(vueObj, response);
          }
      );
    }
  },
  /**
   * Get all elements with property=propertyId
   * Eg, get all elements with appartiene_a_maglia=13.
   * @param {VueObject} vueObj: the caller Vue object
   * @param {number} property: the id of the property (eg, for appartiene_a_maglia, 258)
   * @param {number} propertyResId: the resource id the property must have in the resulting itmes (eg, 13).
   * @callback callback
   * @param {number} classId = null: the id of the class the items should belong to.
   * @callback errorCallback=this.defaultError
   * @param {number} secondProperty = null: the id of the SECOND property
   * @param {numebr} secondPropertyResId = null
   * @param {String} andOr = null: must be "and" or "or"
   */
  getElemByPropertyId: function (vueObj, property, propertyResId, callback, classId = null, errorCallback = this.defaultError, secondProperty = null, secondPropertyResId = null, andOr = null) {
    if (secondProperty === null || secondPropertyResId === null || andOr === null) {
      var url = this.baseUrl_items + '?property[0][property]=' + property + '&property[0][type]=res&property[0][text]=' + propertyResId;
    } else {
      var url = this.baseUrl_items + '?property[0][property]=' + property + '&property[0][type]=res&property[0][text]=' + propertyResId + '&property[0][joiner]=' + andOr + '&property[0][property]=' + secondProperty + '&property[0][type]=res&property[0][text]=' + secondPropertyResId;
    }

    if (classId !== null) {
      url += '&resource_class_id[]=' + classId;
    }

    if (vueObj.$store.getters.getCached[url] !== undefined) {
      callback(vueObj.$store.getters.getCached[url])
    } else {
      vueObj.$http.get(url).then(
          response => {
            vueObj.$store.commit('addCachedUrl', [url, response]);
            callback(response)
          },
          response => {
            errorCallback(vueObj, response);
          }
      );
    }
  },

  /**
   * Gets a resource given its url.
   * @param {VueObject} vueObj: the caller Vue object
   * @param {String} url
   * @callback callback. What to do with the resource.
   * @callback errorCallback=this.defaultError. What to do if an error occurred.
   */
  getElemByUrl: function (vueObj, url, callback, errorCallback = this.defaultError) {
    if (vueObj.$store.getters.getCached[url] !== undefined) {
      callback(vueObj.$store.getters.getCached[url])
    } else {
      vueObj.$http.get(url).then(
          response => {
            vueObj.$store.commit('addCachedUrl', [url, response]);
            callback(response)
          },
          response => {
            errorCallback(vueObj, response);
          }
      );
    }
  },

  /**
   * Returns a list of the element's images.
   * @param {VueObject} vueObj: the caller Vue object
   * @param {Object} element
   * @callback callback. What to do with the resource.
   * @callback errorCallback=this.defaultError. What to do if an error occurred.
   */
  getElementImages: function (vueObj, element, callback, errorCallback = this.defaultError) {
    var mediaUrls = element["o:media"]
    var media = []
    var self = this;
    var waiting = mediaUrls.length;
    const internal_callback = m => {

      if (m.body["o:media_type"] === null && m.body["o:ingester"] === "youtube") {
        //console.warn("L'elemento qui riportato non ha media type. Questo potrebbe causare potenziali problemi. L'app tenterà comunque di visualizzarlo.",m.body)
        //media.push(m.body)
      } else if (m.body["o:media_type"].split("/")[0] === "image")
        media.push(m.body)
      waiting--;
      if (waiting === 0)
        callback(media)
    }
    if (waiting === 0) callback(media)
    else {
      mediaUrls.forEach(mediaUrl => {
        self.getElemByUrl(vueObj, mediaUrl["@id"], internal_callback, errorCallback)
      });
    }
  },

  /**
   * Returns a list of the element's images.
   * @param {VueObject} vueObj: the caller Vue object
   * @param {Object} element
   * @callback callback. What to do with the resource.
   * @callback errorCallback=this.defaultError. What to do if an error occurred.
   */
  getElementYTVideos: function (vueObj, element, callback, errorCallback = this.defaultError) {
    var mediaUrls = element["o:media"]
    var media = []
    var self = this;
    var waiting = mediaUrls.length;

    const internal_callback = m => {
      if (m.body["o:media_type"] === null && m.body["o:ingester"] === "youtube") {
        media.push(m.body)
      }

      waiting--;
      if (waiting === 0)
        callback(media)
    }
    if (waiting === 0) callback(media)
    else {
      mediaUrls.forEach(mediaUrl => {
        self.getElemByUrl(vueObj, mediaUrl["@id"], internal_callback, errorCallback)
      });
    }
  },

  /**
   * Like getElementImages, but returns all types of media.
   */
  getElementMedia: function (vueObj, element, callback, errorCallback = this.defaultError) {
    var mediaUrls = element["o:media"]
    var media = []
    var self = this;
    var waiting = mediaUrls.length;
    const internal_callback = m => {
      media.push(m.body)
      waiting--;
      if (waiting === 0)
        callback(media)
    }
    if (waiting === 0) callback(media)
    else {
      mediaUrls.forEach(mediaUrl => {
        self.getElemByUrl(vueObj, mediaUrl["@id"], internal_callback, errorCallback)
      });
    }
  },


  /**
   * @param {Array} media an array of media (it will filter out everything which is not a video)
   * @returns {any} the main video
   */
  getMainVideo: function (media) {
    for (var i = 0; i < media.length; i++) {
      if (media[i]["o:ingester"] === "youtube" && this.safeString(media[i], ["o:title"]).substr(0, 2) === "P_")
        return media[i]
    }
    return media[0]
  },

  /**
   * Chooses a thumbnail following the guidelines.
   * @param {Array} media: a list of media items (as returned by getElementMedia or getElementImages
   )
   * @returns {any} the designated thumbnail (its title should start with T_), or, alternatively, the main image (its title should start with P_), or, alternatively, the first image in the list
   */
  findThumbnail: function (media) {
    if (!media) return null
    var mainImage = null;
    for (var i = 0; i < media.length; i++) {
      if (media[i]["o:media_type"] !== null && media[i]["o:media_type"].split("/")[0] === "image" && this.safeString(media[i], ["o:title"]).substr(0, 2) === "T_") {
        return media[i]
      } else if (media[i]["o:media_type"] !== null && media[i]["o:media_type"].split("/")[0] === "image" && this.safeString(media[i], ["o:title"]).substr(0, 2) === "P_")
        mainImage = media[i]
    }
    return mainImage === null ? media[0] : mainImage;
  },

  /**
   * Chooses the main image according to the guidelines.
   * @param {Array} media: a list of media items (as returned by getElementImages or getElementMedia
   )
   * @returns {any} the designated main image (its title should start with P_), or, alternatively, the first image in the list
   */
  findMainImage: function (media) {
    if (!media) return null
    for (var i = 0; i < media.length; i++) {
      if (media[i]["o:media_type"] !== null && media[i]["o:media_type"].split("/")[0] === "image" && this.safeString(media[i], ["o:title"]).substr(0, 2) === "P_")
        return media[i]
    }
    return media[0]
  },


  /**
   * Utility in order to avoid getting
   * "cannot read property ... of undefined" when a field is not specified.
   * For example, if we are not sure that
   * elem["prop1"]["prop2"] has a value,
   * we can call s(elem,"prop1","prop2").
   * @param {any} arr: the list or object
   * @param {any} chain: an arbitrary number of elements
   * @param {String} debugging_label=null: if specified, and PRODUCTION=false, print a warning if the resourse cannot be accessed.
   * A warning will ALWAYS be printed if DEBUGGING = true
   * @returns {any} the string, or an empty string if undefined
   */
  safeString: function (arr, chain, debugging_label = null) {
    try {
      var curr = arr;
      for (var i = 0; i < chain.length; i++) {
        curr = curr[chain[i]]
      }
      if (curr === null)
        throw curr + " is null. Aborting"
      return curr;
    } catch (e) {
      if ((!this.PRODUCTION && debugging_label) || this.DEBUGGING) {
        //console.warn(debugging_label,arr,chain,e.message)

      }
      return "";
    }
  },

  processMarkdown: function (st) {
    var tempStr = st.replace("<", "&lt;").replace(">", "&gt;")
    while (tempStr.indexOf("**") !== -1) {
      var firstPos = tempStr.indexOf("**");
      var nextPos = tempStr.indexOf("**", firstPos + 2);
      if (nextPos !== -1) {
        var innerTxt = tempStr.substring(firstPos + 2, nextPos);
        var strongified = '<strong>' + innerTxt + '</strong>';
        tempStr = tempStr.substring(0, firstPos) + strongified + tempStr.substring(nextPos + 2, tempStr.length);
        //get rid of unclosed '**'
      } else {
        tempStr = tempStr.replace('**', '');
      }
    }
    while (tempStr.indexOf("*") !== -1) {
      var firstPos = tempStr.indexOf("*");
      var nextPos = tempStr.indexOf("*", firstPos + 1);
      if (nextPos !== -1) {
        var innerTxt = tempStr.substring(firstPos + 1, nextPos);
        var italicized = '<em>' + innerTxt + '</em> ';
        tempStr = tempStr.substring(0, firstPos) + italicized + tempStr.substring(nextPos + 2, tempStr.length);
        //get rid of unclosed '*'
      } else {
        tempStr = tempStr.replace('*', '');
      }
    }
    tempStr = tempStr.replaceAll("\\", "<br>")
    return tempStr;
  },
  removeMarkdown: function (st) {
    return st.replaceAll('*', '').replaceAll("\\", "")
  }
}

</script>