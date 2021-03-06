import { useState } from "react"
import '../App.css';
import { bubbleSort } from "../sorting-algorithms/bubbleSort.js"
import { selectionSort } from "../sorting-algorithms/selectionSort.js"
import { insertionSort } from "../sorting-algorithms/insertionSort.js"
import { cocktailSort } from "../sorting-algorithms/cocktailSort.js"
import { mergeSort } from "../sorting-algorithms/mergeSort.js"
import { shellSort } from "../sorting-algorithms/shellSort.js"
import { gnomeSort } from "../sorting-algorithms/gnomeSort.js"
import { quickSort } from "../sorting-algorithms/quickSort.js"

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function fillArray(length) {
    let e = new Array(length)
    for (let i = 0; i < length; i++) {
        e[i] = {
            id: i,
            color: "grey",
            value: i + 1
        }
    }
    e.sort(() => Math.random() - 0.5) // random shuffling
    return e
}

const algorithms = {
    bubbleSort,
    selectionSort,
    insertionSort,
    cocktailSort,
    mergeSort,
    shellSort,
    gnomeSort,
    quickSort
}

export default function App() {
    const [debugMode, setDebugMode] = useState(true)
    const [speed, setSpeed] = useState(25);
    const [array, setArray] = useState(fillArray(50))
    const [settingsDisabled, setSettingsDisabled] = useState(false)
    const [sortDisabled, setSortDisabled] = useState(false)
    const [algorithm, setAlgorithm] = useState("bubbleSort")

    async function handleAlgorithm(algorithm) {
        setSettingsDisabled(true)
        setSortDisabled(true)
        let steps = algorithm(array)
        for (let i = 0; i < steps.length; i++) {
            setArray(steps[i])
            await sleep((150 - (speed * 3)))
        }
        setSettingsDisabled(false)
    }

    function handleShuffle() {
        setArray(fillArray(array.length))
        setSortDisabled(false)
    }

    function handleResize(event) {
        setArray(fillArray(event.target.value))
        setSortDisabled(false)
    }

    return (
        <div>
            <div className="grid place-items-center h-screen w-screen dark:bg-gray-800">
                <div className="grid place-items-center">
                    <div className="bg-gray-100 p-[4%] rounded-2xl bottom-0 dark:bg-gray-700">
                        <div className="min-h-[150px] h-[150px] w-[300px] sm:min-h-[300px] sm:h-[300px] sm:w-[600px] justify-center">
                            {array.map(item => {
                                return <div
                                    key={item}
                                    className="inline-block transition-[height] duration-[0.25s] ease-out bottom-0"
                                    style={
                                        { backgroundColor: item.color, width: `${100 / array.length}%`, minHeight: `${(item.value) * (100 / array.length)}%`, height: `${(item.value) * (100 / array.length)}%` }
                                    }></div>
                            })}
                        </div>

                        <div className="flex flex-row justify-center mt-[3%]">

                            <button
                                disabled={settingsDisabled}
                                onClick={handleShuffle}
                            >Shuffle</button>

                            <select className="rounded-full" disabled={settingsDisabled} id="algorithm" onChange={((event) => setAlgorithm(event.target.value))}>
                                <option value={"bubbleSort"}>Bubble Sort</option>
                                <option value={"selectionSort"}>Selection Sort</option>
                                <option value={"insertionSort"}>Insertion Sort</option>
                                <option value={"mergeSort"}>Merge Sort</option>
                                <option value={"quickSort"}>Quick Sort</option>
                                <option value={"cocktailSort"}>Cocktail Sort</option>
                                <option value={"shellSort"}>Shell Sort</option>
                                <option value={"gnomeSort"}>Gnome Sort</option>

                            </select>

                            <button disabled={sortDisabled} onClick={() => handleAlgorithm(algorithms[algorithm])}>Sort</button>

                        </div>

                    </div>

                    <div className="relative mt-[10%] flex justify-between w-[300px] sm:w-[600px]">
                        <a className="ml-[20%]">Speed: {speed * 2}%</a>
                        <a className="mr-[20%]">Size: {array.length} items {array.length > 100 ? "[DEBUG]" : ""}</a>
                    </div>

                    <div className="mt-[1%]" />

                    <div className="relative bg-gray-100 dark:bg-gray-700 rounded-full flex justify-between w-[300px] sm:w-[600px] p-[1.4%]">

                        <input className="ml-[10%] w-[35%]" name="speed-slider" type="range" min={1} max={50} value={speed} disabled={settingsDisabled} onInput={(e) => setSpeed(e.target.value)} />

                        <input className="mr-[10%] w-[35%]" name="size-slider" type="range" min={10} max={debugMode ? 400 : 100} step={10} value={array.size} disabled={settingsDisabled} onInput={handleResize} />


                    </div>
                </div>

            </div>
        </div>
    );
}