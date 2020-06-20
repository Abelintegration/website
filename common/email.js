// Open the email link in a non-searchable way


(function() {
	function assemble(id) {
		let chars = [
			105, 3, 116, 27, 105, 110, 102, 111,
			64, 97, 98, 101, 108, 105, 110, 116,
			101, 103, 114, 97, 116, 105, 111, 110,
			46, 99, 111, 109, 116, 104, 97, 116,
			46, 112, 114, 111, 103, 114, 97, 109,
			64, 103, 109, 97, 105, 108, 46, 99,
			111, 109
		];

		switch(id) {

			case chars[0] | (id = ""):
				while(++chars[1] <= chars[3])
					id += String.fromCharCode(chars[chars[1]]);
			break;

			case chars[2] | (id = ""):
				while(++chars[3] < chars.length)
					id += String.fromCharCode(chars[chars[3]]);
			break;

			default:
				throw new Error("Unexpected id: '" + id + "'");

		}

		return id;
	}


	function link(string, subject) {
		return 'mailto:' + string + '?subject=' + subject;
	}


	// Info email
	document.getElementById('email').addEventListener('click', () => {
		window.open(link(assemble(105), "Web Inquiry"), '_blank');
	});

	document.getElementById('footer-email').addEventListener('click', () => {
		window.open(link(assemble(105), "Web Inquiry"), '_blank');
	});


	// Developer email
	document.getElementById('dev-email').addEventListener('click', () => {
		window.open(link(assemble(116), "From Abelintegration"), '_blank');
	});
})();
