export default () => {
  const container = document.createElement("div");
  container.classList.add("formContent");

  const template = `
    <h2 class="formTitle">Sign Up</h2>

    <p>And be part of the network that keeps you 
    up on the most current information in the 
    world!</p>
    
    <input type="email" class="formInput"  placeholder="E-mail"/>
    <input type="text" class="formInput" placeholder="Choose your nickname"/>

    <p class="smallContent">Enter at least 8 characters.</p>
    <input type="password" placeholder="Password"/>
    <input type="text" placeholder="Confirm your password"/>

    <button class="formButtons">Sign Up</button>
    <p>____________________ or ____________________</p>
    <button class="formButtons" id="google">Google</button>
    `

    container.innerHTML = template;
    return container;
}