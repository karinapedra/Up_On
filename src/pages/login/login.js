export default () => {
  const container = document.createElement("div");
  container.classList.add("formContent");
  const template = `
    <section class="formTitle">
        <h2>Sign in</h2>
        <p> Stay up on the latest happenings from around the world, right here and now.</p>
    </section>
    <input type="email" class="formInput" placeholder="E-mail"></input>
    <input type="password" class="formInput" placeholder="Password"></input>
    <a href="#" class="smallThings">Forgot your password?</a>
    <button class="formButtons">Sign In</button>
    <p>_____________ or ____________</p>
    <button class="formButtons" id="google">Continue with Google</button>
    <p class="smallThings">New in Up_On? <a href="#" >SignUp</a></p>
    <a href="#" class="smallThings">Learn About Up_On</a>
`;

  container.innerHTML = template;
  return container;
};
