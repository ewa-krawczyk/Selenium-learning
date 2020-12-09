// silnie rekurencyjnie
// silnia petla

// function silnia(n) {
//     if (n == 1)
//        return 1
//     else {
//        let result = (n * silnia(n-1) );
//        console.log(result)
//        return result
//     }
//  }
// silnia(7)

function silnia(n){
    let  result = 1;
    for(i = 2; i<=n; i++){
      result = result *i;
    }
    console.log(result)
    return result;
  }
  silnia(7)

  function factorialize(num) {
    if (num === 0 || num === 1) {
      return 1;
    }
    
    for (var i = num - 1; i >= 1; i--) {
      num = num *i;
    }
    console.log(num)
    return num;
  }
  factorialize(7);