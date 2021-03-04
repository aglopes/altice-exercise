const json_data = require("./src/assets/data.json"),
      fs        = require('fs');

var raw_data = JSON.parse(JSON.stringify(json_data));// just parse
var cols = raw_data.cols; //less 1 thing todo during cycle
var fixed_data = []; // final data we need in array of objects

  for(let i = 0; i < raw_data.data.length; i++){
    let item = {};
    let current_data = raw_data.data[i];//lesss 1 instruction for buildin
    for (let k = 0; k < cols.length; k++){
      item[cols[k]] = current_data[k] || "";
    }
    fixed_data.push(item);
  }
  var final_data = {
    data: fixed_data
  };

  fs.writeFile("fixed_data.json", JSON.stringify(final_data, null, '\t'), function(err) {
      if (err) {
          console.log(err);
      }
  });
