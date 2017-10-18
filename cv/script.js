//- original html version saved from
//  https://github.com/n2liquid/curriculum
//  or
//- https://rawgithub.com/
//- n2liquid/curriculum-vitae/template/guilherme-vieira-cv.html

	[].forEach.call (
		document.querySelectorAll('.trim'), function(element) {
			element.textContent = element.textContent.trim();
		}
	);
	var last_hash = '';
	function parse_hash() {
		document.documentElement.removeAttribute('lang');
		document.body.classList.remove('show-hidden');
		[].forEach.call (
			document.querySelectorAll('.hidden'), function(element) {
				element.classList.remove('hidden');
			}
		);
		window.location.hash.slice(1).split(',').forEach (
			function(parameter) {
				switch(parameter) {
					case '':
						break;
					case 'pt-BR':
					case 'en-US':
						document.documentElement.setAttribute('lang', parameter);
						break;
					case 'show-hidden':
						document.body.classList.add('show-hidden');
						break;
					default:
						var match = /^no-(.+)/.exec(parameter);
						if(match) {
							var topic = match[1];
							[].forEach.call (
								document.querySelectorAll('.' + topic), function(element) {
									element.classList.add('hidden');
								}
							);
						}
						break;
				}
			}
		);
	}
	window.requestAnimationFrame (
		function frame() {
			if(window.location.hash !== last_hash) {
				parse_hash();
				last_hash = window.location.hash;
			}
			window.requestAnimationFrame(frame);
		}
	);
	(function setup_input_handlers() {
		var ctrl_down = false;
		function check_ctrl(event) {
			if(event.key !== "Control") {
				return;
			}
			switch(event.type) {
				case 'keydown':
					ctrl_down = true;
					break;
				case 'keyup':
					ctrl_down = false;
					break;
			}
		}
		document.body.addEventListener('keydown', check_ctrl);
		document.body.addEventListener('keyup', check_ctrl);
		document.body.addEventListener (
			'click', function(event) {
				if(!ctrl_down) {
					return;
				}
				var first_block_element = (function() {
					var block_elements = find_parents_and_self (
						event.target, function(element) {
							var display = window.getComputedStyle(element).getPropertyValue('display');
							var block_values = [
								'block'
								, 'list-item'
								, 'table'
								, 'table-caption'
								, 'table-row'
							];
							if(block_values.indexOf(display) !== -1) {
								return true;
							}
						}
					);
					return block_elements[0];
				})();
				if(!first_block_element) {
					return;
				}
				first_block_element.classList.toggle('page-break');
			}
		);
	})();
	function find_parents_and_self(element, predicate) {
		var results = find_parents(element, predicate);
		if(predicate(element)) {
			results.unshift(element);
		}
		return results;
	}
	function find_parents(element, predicate) {
		var results = [];
		for (
			element = element.parentElement
			; element != null
			; element = element.parentElement
		) {
			if(predicate(element)) {
				results.push(element);
			}
		}
		return results;
	}
