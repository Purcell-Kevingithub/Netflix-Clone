import React, { useState, useEffect } from 'react';
import SelectedText from './SelectedText';
import MOVIE_POPULAR_URL from '../../Apis/endPoints';


const Hook = () => {
    // const intialState = {cats: 'meow', dogs: 'rough'} 
    const intialState = ['meow', 'rough'];
    const [currentState, setState] = useState(intialState);

    useEffect(() => {
        fetch(MOVIE_POPULAR_URL)
            .then(response => response.json())
            .then(jsonResponse => {
                const obj1 = jsonResponse.poster_path;
                setState([obj1, ...currentState]);
            })
        // Returning an empty array as second argument here to prevent infinite requests.An empty array only makes the request once so 
        // useeffect acts like componenetdidmount. It will continue to make requests if data passed into array is not equivalent to previous request. 
      }, []);
      

    const upgradeCats = () => {
        // return setOne({...one, cats: 'meowwws'});
        const meowChanged = currentState.map(word => word === 'meow' ? 'meows': word);
        return setState([...meowChanged])
    }
    const upgradeDogs = () => {
        // return setOne({...one, dogs: 'dawg'});
        const roughChanged = currentState.map(word => word === 'rough' ? 'roughs': word)
        return setState([...roughChanged]);
    }
    const resetText = () => {
        return setState([...intialState]);
    }
    let catText = currentState[1];
    let dogText = currentState[2];
    
    return (
        <div className="">
            <div className="grid-item">
                <button onClick={upgradeCats}>ChangeCats</button>
            </div>
            <div className="grid-item">
                <button onClick={upgradeDogs}>ChangeDogs</button>
            </div>
            <div className="grid-item">
                <button onClick={resetText}>Reset</button>
            </div>   
            <div className="grid-item">
                <SelectedText cat={catText} dog={dogText}/>
            </div>
            <div className="grid-item">
               <img src={`https://image.tmdb.org/t/p/w500/${currentState[0]}`}/>
            </div>
        </div>
    );
}


export default Hook;

 