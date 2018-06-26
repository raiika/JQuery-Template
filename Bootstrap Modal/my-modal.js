class MyModal 
{
    
    constructor(modalId)
    {
        this.modalId = modalId
        this.noImage = '/images/no-image.png'
        // $(this.modalId + " form").append('<input name="_token" type="hidden" id="_token" value="' + csrf + '" />')
    }

    isLastModal()
    {
        return this.lastModal == $(this.button).data('action')
    }

    setLastModal(value)
    {
        this.lastModal = value
    }

    update(button)
    {
        this.button = button
    }

    hasImage()
    {
        return $('#image')
    }

    resetCrop()
    {
        $('[name="image"]').val('')
        $('[name="imagename"]').val('No file chosen')
        $("#image").removeAttr('style')
        $(".jcrop-holder").remove()
    }

    emptyInput()
    {
        $("[name]").val('').change()
    }

    setInputValue()
    {
        $('.alert-danger').remove()
        if (this.hasImage) {
            $('#image').attr('src', $(this.button).data('image') || this.noImage)
        }

        for (var property in $(this.button).data()) {
            var data = $(this.button).data(property)
            if (property !== "image") {
                $('[name="' + property + '"]').val(data).change()
            }
        }

        $('[name="action"]').attr('formaction', $(this.button).data('action'))
        $('[name="action"]').val($(this.button).data('action'))
    }

    showAddModal()
    {
        if (!this.isLastModal()) {
            this.emptyInput()
            this.resetCrop()
            this.setInputValue()
        }

        $("[name='_method']").val('POST');

        this.setLastModal($(this.button).data('action'))
    }

    showEditModal()
    {
        if (!this.isLastModal()) {
            this.resetCrop()
            this.setInputValue()
        }

        $("[name='_method']").val('PATCH')

        this.setLastModal($(this.button).data('action'))
    }

    showDeleteModal()
    {
        var action = $(this.button).data('action');

        $("#delSubmit").attr('formaction', action);
    }

    click(classname, closure)
    {
        $('.alert-danger').remove()
        $(classname).click(closure)
    }

    setTitleClass(titleClassname)
    {
        this.titleClassname = titleClassname
    }

    setTitle(string)
    {
        $(this.titleClassname).html(string)
    }

    setModalId(value)
    {
        this.modalId = value;
    }

    onFailed(json)
    {

        $(this.modalId).modal('show');

        $.each(json, function(key, value) {
            $('[name="' + key + '"]').val(value).change()
        })

        if (this.hasImage()) {
            $('#image').attr('src', $('[data-action="' + json.action + '"]').attr('data-image') || this.noImage)
        }

        this.resetCrop();
        $('[name="action"]').val(json.action).change()
        $('[name="action"]').attr('formaction', json.action).change()

        this.setLastModal(json.action)
    }
}