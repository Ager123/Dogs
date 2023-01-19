export function validate(input){
    let{name,maxHeight,minWeight,minHeight,maxWeight,lifespan,temperaments}=input;
    let error={};
    var re= /^[a-zA-Z ]*$/g;
    const regexValidate = (value,re) => re.test(value);
    
    if(!name) {
        error={...error,name:"Name field is required"};
    }else if(input.name.length>=50){
        error={...error,name:"The entered name is too long"}
    }else if(!regexValidate(name,re)){
        error={...error,name: "Name can only contain letters"}
    };
    
    if(!maxWeight || !minWeight){
        error={...error,weight:"There must be Max and Min weight"}
    }else if(isNaN(maxWeight)||isNaN(minWeight)){
        error={...error,weight:"Weight must be a number"}
    }else if(maxWeight<0||minWeight<1) {
        error={...error,weight:"Weight must be higher than 0 kg"}
    }else if(maxWeight>200 ||minWeight>200){
        error={...error,weight:"Weight must be lesser than 200 kg"}
    }else if(parseInt(maxWeight)<parseInt(minWeight)){
        error={...error,weight:"Max weight must be higher than min weight"}
    };

    if(!maxHeight || !minHeight){
        error={...error,height:"There must be Max and Min height"}
    }else if(isNaN(maxHeight)||isNaN(minHeight)) {
        error={...error,height:"Height must be a number"}
    }else if(maxHeight<0||minHeight<0) {
        error={...error,height:"Height must be higher than 0 cm"}
    }else if(maxHeight>200 ||minHeight>200) {
        error={...error,height:"Height must be lesser than 200 cm"}
    }else if(parseInt(maxHeight)<parseInt(minHeight)) {
        error={...error,height:"Max height must be higher than min height"}
    };

    if(lifespan && isNaN(lifespan)) {
        error={...error,lifespan:"Life Span must be a number"}
    }else if(lifespan && (lifespan<1||lifespan>50)) {
        error={...error,lifespan:"Life Span must be a number between 1 and 50"}
    };

    if(!temperaments.length){
        error={...error,temperaments:"You must select at least 1 temperament"}
    };
    
    return error
}

export function stringArrayCompare(string, array){
    let compare=array.filter(temp=>temp.toLowerCase()===string.toLowerCase());
    if(compare.length) return true
    else return false
}
export function firstCharUppercase(string){
    let lower=string.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
}