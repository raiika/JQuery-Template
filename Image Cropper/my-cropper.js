class ImageCropper
{
    constructor(urlratio, imageIdentifier = 'image', imagenameIdentifier = 'imagename', cropperIdentifier = '#image', modalIdentifier = '.modal')
    {
        if (urlratio.constructor === String) {
            this.urlratio  = urlratio
        } else {
            this.ratio = urlratio
        }
        
        this.modal     = modalIdentifier
        this.image     = '[name="' + imageIdentifier + '"]'
        this.imagename = '[name="' + imagenameIdentifier + '"]'
        this.cropper   = cropperIdentifier
    }

    attachCropper()
    {
        var parent = this

        if (this.urlratio !== undefined) {
            $.ajax({
                url: this.urlratio,
                dataType: 'application/json',
                complete: function(data) {
                    parent.onAjaxComplete(data, parent)
                }
            })
        } else {
            this.onAjaxComplete(this.ratio, this)
        }
    }

    static ratio(value)
    {
        return new this(value)
    }

    imageIdentifier(value)
    {
        this.image = '[name="' + value + '"]'
        return this
    }

    modalIdentifier(value)
    {
        this.modal = value
        return this
    }

    rawImageIdentifier(value)
    {
        this.image = value
        return this
    }

    imagenameIdentifier(value)
    {
        this.imagename = '[name="' + value + '"]'
        return this
    }

    rawImagenameIdentifier(value)
    {
        this.imagename = value
        return this
    }

    cropperIdentifier(value)
    {
        this.cropper = value
        return this
    }

    update_coords(c, imageCropper) {
        var imgOrignalWidth     = $(imageCropper.cropper).prop('naturalWidth');
        var imgOriginalHeight   = $(imageCropper.cropper).prop('naturalHeight');

        var imgResponsiveWidth  = parseInt($(imageCropper.cropper).css('width'));
        var imgResponsiveHeight = parseInt($(imageCropper.cropper).css('height'));                

        var responsiveX         = Math.ceil((c.x/imgResponsiveWidth) * imgOrignalWidth);
        var responsiveY         = Math.ceil((c.y/imgResponsiveHeight) * imgOriginalHeight);

        var responsiveW         = Math.ceil((c.w/imgResponsiveWidth) * imgOrignalWidth);
        var responsiveH         = Math.ceil((c.h/imgResponsiveHeight) * imgOriginalHeight);

        $('#x').val(responsiveX);
        $('#y').val(responsiveY);
        $('#w').val(responsiveW);
        $('#h').val(responsiveH);
    }

    onAjaxComplete(data, imageCropper)
    {
        if (data.responseText !== undefined) {
            var data = eval('(' + data.responseText+ ')')
        }

        var oldImg = $(imageCropper.cropper).attr('src')

        $(imageCropper.image).click(function () {
            $(imageCropper.cropper).removeAttr('style')
            $(imageCropper.cropper).attr('src', oldImg)
            $(".jcrop-holder").remove()
            $(imageCropper.image).val('')
            $(imageCropper.imagename).val('No file chosen')
        });

        $(imageCropper.modal).on('shown.bs.modal', function (e) {
          oldImg = $(imageCropper.cropper).attr('src')
        })

        var fileInput = $(imageCropper.image)[0]
        var img = $(imageCropper.cropper)[0]

        fileInput.addEventListener('change', function(e) {
            $(imageCropper.cropper).removeAttr('style')
            $(".jcrop-holder").remove()
            var file = fileInput.files[0]
            var imageType = /image.*/

            if (file.type.match(imageType)) {
                var reader = new FileReader()
                reader.onload = function(e) {
                    img.src = reader.result;
                    setTimeout(function() {
                        var jcrop_api = $.Jcrop(imageCropper.cropper, {
                            aspectRatio: data.w / data.h,
                            onSelect: function(c) {
                                imageCropper.update_coords(c, imageCropper)
                            },
                            onChange: function(c) {
                                imageCropper.update_coords(c, imageCropper)
                            },
                            allowSelect: false,
                            onRelease: function () {
                                this.setOptions({ setSelect: [0,0,parseInt($(imageCropper.cropper).css('width')), parseInt($(imageCropper.cropper).css('height'))] });
                            },
                            setSelect: [0, 0, parseInt($(imageCropper.cropper).css('width')), parseInt($(imageCropper.cropper).css('height'))],
                            bgOpacity: 0.2,
                            minSize: [10,10],
                            keySupport: false
                        });
                    }, 0);
                }

                reader.readAsDataURL(file); 
            } else {
                img.src = "";
            }
        })
    }
}
