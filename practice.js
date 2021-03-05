/*for(var i=0;i<5;i++){
  setTimeout(()=>{
    console.log("normal ", i);
  },0);
}
for(let i=0;i<5;i++){
  setTimeout(()=>{
    console.log("with let ",i);
  },1000);
}
for(var i=0;i<5;i++){
  setTimeout(function() {
    console.log("with bind ",i);
  }.bind(i),2000);
}
*/

function seq_rec(n){
  if(n < 3){
    if (n == 0)
      return 0;
    return 1;
  }else{
    return (seq_rec(n-3) + seq_rec(n-2));
  }
}
function seq_it(n){
  if(n < 3){
    if (n == 0)
      return 0;
    return 1;
  }else{
    var f0 = 0;
    var f1 = 1;
    var f2 = 1;
    var fn = 1;
    for(let i = 3; i<=n; i++){
      fn = f0 + f1;
      f0 = f1;
      f1 = f2;
      f2 = fn;
    }

  }
  return fn;
}
console.log("---recursive---");
for (var i = 0 ; i < 10; i++){
  console.log(seq_rec(i));
}
console.log("---iterative---");
for (var i = 0 ; i < 10; i++){
  console.log(seq_it(i));
}
