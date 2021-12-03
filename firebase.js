// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB88DUE3gVqAdxzB9gzG4GEzIfec4L7RZo",
  authDomain: "d3-testing-ad107.firebaseapp.com",
  projectId: "d3-testing-ad107",
  storageBucket: "d3-testing-ad107.appspot.com",
  messagingSenderId: "462423979884",
  appId: "1:462423979884:web:780b2fc149c3adef03e549",
  measurementId: "G-9SBBCKMQXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var data = [];

// Get a list of dishes from your database
async function getDishes(db) {
    // const dishCol = collection(db, 'dishes');
    // const dishSnapshot = await getDocs(dishCol);
    // const dishList = dishSnapshot.docs.map(doc => doc.data());
    // return dishList
    onSnapshot(collection(db, "dishes"), (res) => {
        res.docChanges().forEach(change => {
            const doc = { ...change.doc.data(), id: change.doc.id};

            switch (change.type) {
                case 'added':
                    data.push(doc);
                    break;
                case 'modified':
                    const index = data.findIndex(item => item.id == doc.id);
                    data[index] = doc;
                    break;
                case 'removed':
                    data = data.filter(item => item.id !== doc.id);
                    break;
            
                default:
                    break;
            }
        })
        update(data);
    });
}

// append svg container
const svg = d3.select(".canvas")
                    .append('svg')
                    .attr('height', 600)
                    .attr('width', 600)

//create margin and dimentions
const margins = {'top':20, 'left': 100, 'bottom':100, 'right': 20};
const graphWidth = 600 - margins.left - margins.right;
const graphHeight = 600 - margins.top - margins.bottom;

const graph = svg.append('g')
                .attr('height', graphHeight)
                .attr('width', graphWidth)
                .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

const xAxisGroup = graph.append('g')
                        .attr('transform', 'translate(' + 0 + ',' + graphHeight + ')');
const yAxisGroup = graph.append('g');

// scale
const y = d3.scaleLinear()
    .range([graphHeight, 0]);

const x = d3.scaleBand()
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2)

// create and call the axis
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

//update function
const update = (data) => {
    //updating scale domains
    y.domain([0,d3.max(data, d => d.orders)]);
    x.domain(data.map(item => item.name));

    // join the data to the rects
    const rects = graph.selectAll('rect')
        .data(data);

    // remove exit selection
    rects.exit().remove();

    //update shapes
    rects.attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders));

    //append the enter selection to the DOM
    rects.enter().append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders));

    // update axis
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
}

getDishes(db);

// getDishes(db).then(data => {
//     console.log(data);
//     update(data);

//     d3.interval(()=>{
//         data[2].orders += 50;
//         // update(data);
//     }, 1000)
// })