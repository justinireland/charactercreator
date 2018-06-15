function parseHash(c, forms, skinLayers, hairLayers){
    newParseHash();
    var formsLength = forms.length;
    var formsCounter = formsLength;
    while (formsCounter--) {
        var f = formsLength - formsCounter - 1;
        for(var x in forms[f]) {
            var section =  x.toLowerCase();
            if (section ==='brows'||section === 'eyes'||section === 'mouth'||section === 'lashes'){
                // if (section === "pupils") {
                //     var hashPupils = hash.get('pupils');
                //     if (hashPupils == undefined) {
                //         hashPupils = 'human';
                //     };
                //     section += "_" + hashPupils;
                // }
                var hashData = hash.get('emotion');
                if (hashData === undefined) {
                    hashData = 'neutral';
                }
            } else {
                var hashData = hash.get(section);
            }
            var id = section + '_' + hashData;
            if (hashData != undefined){
                // Add the key/value pair to c.choices here
                modCharacter(section, hashData);
                ga('send', 'event', 'hash', 'select', id);
            }else if(section === 'brows'||section === 'eyes'||section === 'mouth') {
                modCharacter(section, 'neutral');
            };
            if (id in skinLayers || section ==='body') {
                section = 'skin';
            }
            else if (id in hairLayers || section ==='hair'){ section = 'hair'};
            var hashColor = hash.get(section+'Color');
            // Now to get the color
            if (hashColor != undefined && hashColor != '') {
                modCharacter(section+'Color', hashColor);
                ga('send', 'event', 'hash', 'color', section+'_'+hashColor );
            };
        };
    };
};
function newParseHash() {
  var hashDict = hash.get();
  var keys = Object.keys(hashDict);
  var key;
  console.log('hashDict', hashDict);
  console.log('keys', keys);
  for (key in hashDict) {
    console.log('key', key);
    console.log('value', hashDict[key]);
  }
  console.log('c', c);
}
