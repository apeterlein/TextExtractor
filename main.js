"use strict";

$(document).ready(function () {
	$("#file").change(function () {
		readImage(document.getElementById("file").files[0]).then(function (out) {
			$("#out").val(out.data.text.trim());
		});
		$("#file").val("");
	});
	$("#go").click(function () {
		window.open($("#out").val().replace(/[\n\r]/g, ""), '_blank').focus();
	});
	document.addEventListener("dragover", function (evt) { evt.preventDefault(); } );
	document.addEventListener("dragenter", function (evt) { evt.preventDefault(); } );
	document.addEventListener("drop", function (evt) {
		evt.preventDefault();
		document.getElementById("file").files = evt.dataTransfer.files;
		$("#file").trigger("change");
	});
	document.addEventListener("paste", function (evt) {
		evt.stopPropagation();
		evt.preventDefault();
		const data = evt.clipboardData || window.clipboardData;
		readImage(data.files[0]).then(function (out) {
			$("#out").val(out.data.text.trim());
		});
	});
});