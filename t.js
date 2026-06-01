//Sanitizes user input to prevent XSS attacks.Convents all to plain text.@param{str} input The user input to sanitize.@return{obj} The sanitized input.
function pe(e,d=0){if(e.trim()=='')return'';if(d)console.log('Sanitizing entry: "'+e+'"');var v=(typeof e=='string')?e:e.value;return{p:new DOMParser().parseFromString(v,'text/html').documentElement.textContent,s:v.toString()};};
