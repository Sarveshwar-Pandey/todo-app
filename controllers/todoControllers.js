const asyncHandler = require('express-async-handler')
const Todo = require('../models/todoModel')
const validateToken = require('../middleware/validateToken')

//@desc Get all todos
//@route GET /api/todos
//access public
const getTodos =asyncHandler( async (req,res) => {
  //find all todos of a particular user in db, authentication middleware verify the user and sends his all todo
  const todos = await Todo.find({user: req.user.id})
  console.log(todos);
  
  res.render("view_todos",{todos})
})

//@desc Create a new todo
//@route POST /api/todos
//access public
const createTodo = asyncHandler(async (req,res) => {
  console.log(req.body);
  const {title,description,isCompleted,dueDate} = req.body
  if(!title){
    res.status(400)
    throw new Error("Please create a todo!")
  }
  const todo =await Todo.create({
    title,description,isCompleted,dueDate,
    user: req.user.id
  })
  console.log(req.user);
  res.redirect("/api/todos");
  // res.status(201).json(todo)
})

//@desc Update todo
//@route PUT /api/todos/:id
//access public
const updateTodo =asyncHandler (async (req,res) => {
  const {title,description,isCompleted,dueDate} = req.body
  const todo = await Todo.findById(req.params.id)
  if(!todo){
    res.status(404)
    throw new Error("Todo not found")
  }
  if(todo.user.toString() !== req.user.id){
    res.status(403);
    throw new Error("Users don't have permission to update other user todo!")
  }
  console.log("Incoming ID:", req.params.id);
console.log("Body:", req.body);

  todo.title = title;
  todo.description = description;
  todo.isCompleted = isCompleted === "on"; // checkbox
  todo.dueDate = dueDate;

  await todo.save();

  res.redirect("/api/todos")
  // res.status(200).json(updatedTodo)
})

// //@desc Delete todo
// //@route DELETE /api/todos/:id
// //access public
// const deleteTodo =asyncHandler (async (req,res) => {
//   const todo = await Todo.findById(req.params.id)
//   if(!todo){
//     res.status(404)
//     throw new Error("Todo not found")
//   }
//   console.log("Todo.user:", todo.user);
// console.log("Req.user.id:", req.user._id);

//   if(todo.user.toString() !== req.user.id){
//     res.status(403);
//     throw new Error("Users don't have permission to update other user contact!")
//   }
//   const deletedTodo =await Todo.deleteOne({id: req.params.id});
//   res.status(200).json(deletedTodo)
// })
//@desc Delete todo
//@route DELETE /api/todos/:id
//@access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  console.log("Todo.user:", todo.user.toString());
  console.log("Req.user.id:", req.user.id);

  if (todo.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You are not allowed to delete this todo!");
  }

  const deletedTodo = await Todo.deleteOne({ _id: req.params.id });
  // res.status(200).json({ message: "Todo deleted", deletedTodo });
  res.redirect("/api/todos");
});


//@desc Get todo information
//@route GET /api/todos/:id
//access public
const getTodo =asyncHandler (async (req,res) => {
  const todo = await Todo.findById(req.params.id)
  if(!todo){
    res.status(404)
    throw new Error("Todo not found")
  }
  res.status(200).json(todo)
})

module.exports = {getTodos, createTodo, updateTodo, deleteTodo, getTodo}