# JQuery-Template
Semua template yang biasa aku pake pas bikin project pake JQuery

# Image Cropper
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <link href="/css/jquery.Jcrop.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="/js/jquery.Jcrop.js"></script>
    <script type="text/javascript" src="/js/my-cropper.js"></script>
    <script>
        $(window).load(function() {
                ImageCropper.ratio({!! json_encode(["w" => $dimension[0], "h" => $dimension[1]]) !!}).attachCropper()

                {{-- ImageCropper.ratio("{{ route('admin.slider.ratio') }}").attachCropper() --}}

                // $imageCropper = new ImageCropper("")
                // $imageCropper.cropperIdentifier('.cupu').attachCropper()
        })
    </script>

2 approach, 
 - Pake string ke link API nanti akan di fetch pke ajax
 - Lgsg pke object dengan json_encode di php

Bisa pake static atau object

Cropper default cropperIdentifier nya “#image”

Syarat: menyediakan input:
    <input id="x" type="hidden" name="x">
    <input id="y" type="hidden" name="y">
    <input id="w" type="hidden" name="w">
    <input id="h" type="hidden" name="h">

# Bootstrap Modal
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script type="text/javascript" src="/js/my-modal.js"></script>
    <script>
        $modal = new MyModal("#modal-add-client")
        $modal.setTitleClass('.modal-title')

        $(document).ready(function() {
            $('.addClient').click(function () {
                    $modal.setTitle('Add Client')
                    $modal.update(this)

                    $modal.showAddModal()
            })

            $(".editClient").click(function () {
                    $modal.setTitle('Edit Client')
                    $modal.update(this)

                    $modal.showEditModal()
            });

            $(".delClient").click(function () {
                    var action = $(this).data('action');
                    $modal.update(this)
                    
                    $modal.showDeleteModal()
            });
        });

        @if ($errors->client->any())
                $modal.onFailed({!! json_encode(session()->getOldInput()) !!})
        @endif
    </script>


onFailed muncul modal dengan error (harus diisi sendiri di modal)
    @if ($errors->$errorBag->any())
	<div class="alert alert-danger">
		{!! implode('<br />', $errors->$errorBag->all()) !!}
	</div>
    @endif

Dan inputan sesuai dengan old, beserta image nya berdasarkan data-image yg punya data-action yg sama seperti old('action').

Modal ini pke button formaction

Syarat: nama input dan data-nama harus sama -> contoh: 
    <span data-action=”{{ route(‘example’) }}”>
    <button name=”action” formaction=”nanti-keisi”>
