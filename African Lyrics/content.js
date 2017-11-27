document.write( 'Hey this is text from content.js' );
module.exports = setTimeout(function() {
    document.write( require('./content2.js') );
}, 3000);