let initialState = {
    rectangles: [],
    circles: []
}

class Rectange{
    constructor(x, y){
        this.x = x;
    this.y = y;
    this.xS = x; //saving x
    this.yS = y; //saving y
    this.w = 50;
    this.h = 50;
    
    //to determine if the box is being draged
    this.draging = false;
    }
}

class Circle{
    constructor(x, y){
        this.x = x;
    this.y = y;
    this.xS = x; //saving x
    this.yS = y; //saving y
    this.radius = 50;
    
    //to determine if the box is being draged
    this.draging = false;
    }
}


const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_SHAPE":
            if (action.shape == "RECTANGLE"){
                const rect = new Rectange(action.coordinates.x, action.coordinates.y);
                return {
                    ...state,
                    rectangles: [...state.rectangles, rect]
                }
            };
            if (action.shape == "CIRCLE"){
                const circle = new Circle(action.coordinates.x, action.coordinates.y);
                return {
                    ...state,
                    circles: [...state.circles, circle]
                }
            };
        case "MOVE_SHAPE":
            if (action.shape == "RECTANGLE"){
                const newArray = [...state.rectangles]; //making a new array
                newArray[action.index].x = action.coordinates.x; //changing value in the new array
                newArray[action.index].y = action.coordinates.y;
                return {
                    ...state,
                    rectangles: newArray
                };
            };
            if (action.shape == "CIRCLE"){
                const newArray = [...state.circles]; //making a new array
                newArray[action.index].x = action.coordinates.x; //changing value in the new array
                newArray[action.index].y = action.coordinates.y;
                return {
                    ...state,
                    circles: newArray
            };
            };
            
        case "SET_DRAGING":
            if (action.shape == "RECTANGLE"){
                const array = [...state.rectangles]; //making a new array
                array[action.index].draging = action.condition; //changing value in the new array
                return {
                ...state,
                rectangles: array
            };
            };
            if (action.shape == "CIRCLE"){
                const array = [...state.circles]; //making a new array
                array[action.index].draging = action.condition; //changing value in the new array
                return {
                ...state,
                circles: array
            };
            };
        
            case "SET_STATE":
                return {
                    ...action.state
                }
            
        default:
            return state;

    }
}

export default Reducer;