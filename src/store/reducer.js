let initialState = {
    rectangles: [],
    circles: [],
    triangles: [],
    squares: []
}

class Rectange{
    constructor(x, y){
        this.x = x;
    this.y = y;
    this.xS = x; //saving x
    this.yS = y; //saving y
    this.w = 100;
    this.h = 50;
    
    //to determine if the box is being draged
    this.draging = false;
    }
}

class Square{
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

class Triangle{
    constructor(x, y){
        this.x = x;
    this.y = y;
    this.xS = x; //saving x
    this.yS = y; //saving y
    this.w = 50;
    this.h = 100;

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
            if (action.shape == "TRIANGLE"){
                const triangle = new Triangle(action.coordinates.x, action.coordinates.y);
                return {
                    ...state,
                    triangles: [...state.triangles, triangle]
                }
            };
            if (action.shape == "SQUARE"){
                const square = new Square(action.coordinates.x, action.coordinates.y);
                return {
                    ...state,
                    squares: [...state.squares, square]
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
            if (action.shape == "SQUARE"){
                const newArray = [...state.squares]; //making a new array
                newArray[action.index].x = action.coordinates.x; //changing value in the new array
                newArray[action.index].y = action.coordinates.y;
                return {
                    ...state,
                    squares: newArray
            };
            };
            if (action.shape == "TRIANGLE"){
                const newArray = [...state.triangles]; //making a new array
                newArray[action.index].x = action.coordinates.x; //changing value in the new array
                newArray[action.index].y = action.coordinates.y;
                return {
                    ...state,
                    triangles: newArray
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
            if (action.shape == "SQUARE"){
                const array = [...state.squares]; //making a new array
                array[action.index].draging = action.condition; //changing value in the new array
                return {
                ...state,
                squares: array
            };
            };
            if (action.shape == "TRIANGLE"){
                const array = [...state.triangles]; //making a new array
                array[action.index].draging = action.condition; //changing value in the new array
                return {
                ...state,
                triangles: array
            };
            };
            case "SET_STATE":
                return {
                    ...action.state
                }
            case "DELETE_SHAPE":
                if (action.shape == "RECTANGLE"){
                    const newArray = [...state.rectangles]; //making a new array
                    return {
                        ...state,
                        rectangles: newArray.slice(0, action.index).concat(newArray.slice(action.index + 1, newArray.length))
                    };
                };
                if (action.shape == "CIRCLE"){
                    const newArray = [...state.circles]; //making a new array
                    return {
                        ...state,
                        circles: newArray.slice(0, action.index).concat(newArray.slice(action.index + 1, newArray.length))
                    };
                };
                if (action.shape == "SQUARE"){
                    const newArray = [...state.squares]; //making a new array
                    return {
                        ...state,
                        squares: newArray.slice(0, action.index).concat(newArray.slice(action.index + 1, newArray.length))
                    };
                };
                if (action.shape == "TRIANGLE"){
                    const newArray = [...state.triangles]; //making a new array
                    return {
                        ...state,
                        triangles: newArray.slice(0, action.index).concat(newArray.slice(action.index + 1, newArray.length))
                    };
            }

            
        default:
            return state;

    }
}

export default Reducer;