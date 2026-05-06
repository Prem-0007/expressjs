fetch('https://reqres.in/api/users', {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "morpheus",
    job: "leader"
  })
})
.then(res => res.json())
.then(data => {
  console.log("SUCCESS");
  console.log(data);
})
.catch(err => {
  console.log("ERROR:", err);
});