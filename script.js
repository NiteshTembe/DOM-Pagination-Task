document.title="Pagination"
//H1 tag with id=title
const t1 = document.createElement("h1")
t1.id = "title"
const t1textnode = document.createTextNode("Student Data Table")
t1.appendChild(t1textnode)
document.body.appendChild(t1)
//<p> tag with id=description
const desc = document.createElement("p")
desc.id = "description"
const descnode = document.createTextNode("Data of 10 Students Per Page")
desc.appendChild(descnode)
document.body.appendChild(desc)
// div with class=table-responsive

const tdiv = document.createElement("div")
tdiv.classList.add("table-responsive")
const tableElement = document.createElement("table")
tableElement.id = "table"
tableElement.classList.add("table")
tableElement.classList.add("table-bordered")
tdiv.appendChild(tableElement)
document.body.appendChild(tdiv)
// Insert table element with innerHtml
document.getElementById("table").innerHTML = `<thead>
                    <tr>
                        <th>STUDENT ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                    </tr>
                </thead>
                <tbody id="tabledata">  
                </tbody>`


//<div id="buttons" class=""></div>`
const btn = document.createElement("div")
btn.id = "buttons"
btn.classList.add("d-flex")
btn.classList.add("justify-content-center")
document.body.appendChild(btn)

let req = new XMLHttpRequest()
    req.open('GET','https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
    req.send()
    req.onload=function(){
    var data = JSON.parse(req.response)
 //   console.log(data.length/10)
let content=""
let table=""
let pageNo = parseInt(window.location.search.replace("?page=",""))
if(!Number.isInteger(pageNo)){
    pageNo = 1;
}
if(data.length>0){
    const lastdata = (pageNo*10)>(data.length)? data.length : (pageNo*10)
   
    for(let i=(pageNo*10-10);i<lastdata;i++){
        table+=`
        <tr>
        <td>${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].email}</td>
        </tr>`
    }
    document.getElementById("tabledata").innerHTML=table
    content += `<div class="pagination">  <a href="?page=1">FIRST</a>`
    if(pageNo>1){
    content += `<a href="?page=${pageNo-1}">PREVIOUS</a>`
    }
    for(let i=0;i<Math.ceil(data.length/10);i++){
        content += `<a href="?page=${i+1}" `
        if(pageNo==i+1){
            content+=`class="active"`
        }
        content+=`>${i+1}</a>`
    }
    if(pageNo!=Math.ceil(data.length/10)){ content += `<a href="?page=${pageNo+1}">NEXT</a>` }

    content+=`
    <a href="?page=${Math.ceil(data.length/10)}">LAST</a>
    </div>`
    document.getElementById("buttons").innerHTML=content
}


}