"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var ImageCropper = (function() {
  function ImageCropper(urlratio) {
    var imageIdentifier =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : "image";
    var imagenameIdentifier =
      arguments.length > 2 && arguments[2] !== undefined
        ? arguments[2]
        : "imagename";
    var cropperIdentifier =
      arguments.length > 3 && arguments[3] !== undefined
        ? arguments[3]
        : "#image";
    var modalIdentifier =
      arguments.length > 4 && arguments[4] !== undefined
        ? arguments[4]
        : ".modal";

    _classCallCheck(this, ImageCropper);

    if (urlratio.constructor === String) {
      this.urlratio = urlratio;
    } else {
      this.ratio = urlratio;
    }

    this.modal = modalIdentifier;
    this.image = '[name="' + imageIdentifier + '"]';
    this.imagename = '[name="' + imagenameIdentifier + '"]';
    this.cropper = cropperIdentifier;
  }

  _createClass(
    ImageCropper,
    [
      {
        key: "attachCropper",
        value: function attachCropper() {
          var parent = this;

          if (this.urlratio !== undefined) {
            $.ajax({
              url: this.urlratio,
              dataType: "application/json",
              complete: function complete(data) {
                parent.onAjaxComplete(data, parent);
              }
            });
          } else {
            this.onAjaxComplete(this.ratio, this);
          }
        }
      },
      {
        key: "imageIdentifier",
        value: function imageIdentifier(value) {
          this.image = '[name="' + value + '"]';
          return this;
        }
      },
      {
        key: "modalIdentifier",
        value: function modalIdentifier(value) {
          this.modal = value;
          return this;
        }
      },
      {
        key: "rawImageIdentifier",
        value: function rawImageIdentifier(value) {
          this.image = value;
          return this;
        }
      },
      {
        key: "imagenameIdentifier",
        value: function imagenameIdentifier(value) {
          this.imagename = '[name="' + value + '"]';
          return this;
        }
      },
      {
        key: "rawImagenameIdentifier",
        value: function rawImagenameIdentifier(value) {
          this.imagename = value;
          return this;
        }
      },
      {
        key: "cropperIdentifier",
        value: function cropperIdentifier(value) {
          this.cropper = value;
          return this;
        }
      },
      {
        key: "update_coords",
        value: function update_coords(c, imageCropper) {
          var imgOrignalWidth = $(imageCropper.cropper).prop("naturalWidth");
          var imgOriginalHeight = $(imageCropper.cropper).prop("naturalHeight");

          var imgResponsiveWidth = parseInt(
            $(imageCropper.cropper).css("width")
          );
          var imgResponsiveHeight = parseInt(
            $(imageCropper.cropper).css("height")
          );

          var responsiveX = Math.ceil(
            (c.x / imgResponsiveWidth) * imgOrignalWidth
          );
          var responsiveY = Math.ceil(
            (c.y / imgResponsiveHeight) * imgOriginalHeight
          );

          var responsiveW = Math.ceil(
            (c.w / imgResponsiveWidth) * imgOrignalWidth
          );
          var responsiveH = Math.ceil(
            (c.h / imgResponsiveHeight) * imgOriginalHeight
          );

          $("#x").val(responsiveX);
          $("#y").val(responsiveY);
          $("#w").val(responsiveW);
          $("#h").val(responsiveH);
        }
      },
      {
        key: "onAjaxComplete",
        value: function onAjaxComplete(data, imageCropper) {
          if (data.responseText !== undefined) {
            var data = eval("(" + data.responseText + ")");
          }

          var oldImg = $(imageCropper.cropper).attr("src");

          $(imageCropper.image).click(function() {
            $(imageCropper.cropper).removeAttr("style");
            $(imageCropper.cropper).attr("src", oldImg);
            $(".jcrop-holder").remove();
            $(imageCropper.image).val("");
            $(imageCropper.imagename).val("No file chosen");
          });

          $(imageCropper.modal).on("shown.bs.modal", function(e) {
            oldImg = $(imageCropper.cropper).attr("src");
          });

          var fileInput = $(imageCropper.image)[0];
          var img = $(imageCropper.cropper)[0];

          fileInput.addEventListener("change", function(e) {
            $(imageCropper.cropper).removeAttr("style");
            $(".jcrop-holder").remove();
            var file = fileInput.files[0];
            var imageType = /image.*/;

            if (file.type.match(imageType)) {
              var reader = new FileReader();
              reader.onload = function(e) {
                img.src = reader.result;
                setTimeout(function() {
                  var jcrop_api = $.Jcrop(imageCropper.cropper, {
                    aspectRatio: data.w / data.h,
                    onSelect: function onSelect(c) {
                      imageCropper.update_coords(c, imageCropper);
                    },
                    onChange: function onChange(c) {
                      imageCropper.update_coords(c, imageCropper);
                    },
                    allowSelect: false,
                    onRelease: function onRelease() {
                      this.setOptions({
                        setSelect: [
                          0,
                          0,
                          parseInt($(imageCropper.cropper).css("width")),
                          parseInt($(imageCropper.cropper).css("height"))
                        ]
                      });
                    },
                    setSelect: [
                      0,
                      0,
                      parseInt($(imageCropper.cropper).css("width")),
                      parseInt($(imageCropper.cropper).css("height"))
                    ],
                    bgOpacity: 0.2,
                    minSize: [10, 10],
                    keySupport: false
                  });
                }, 0);
              };

              reader.readAsDataURL(file);
            } else {
              img.src = "";
            }
          });
        }
      }
    ],
    [
      {
        key: "ratio",
        value: function ratio(value) {
          return new this(value);
        }
      }
    ]
  );

  return ImageCropper;
})();
