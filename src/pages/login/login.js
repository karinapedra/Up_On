export default () => {
    const container = document.createElement('div');
    container.classList.add('formContent')
    const template = `
    <h2 class="formTitle">Sign in</h2>
    <p class="formTitle"> Stay up on the latest happenings from around the world, right here and now.</p>
    <input type="email" class="formInput" placeholder="E-mail"></input>
    <input type="password" class="formInput" placeholder="Password"></input>
    <button class="formButtons">Sign In</button>
    <a href="#" class="forgotPassoword">Forgot your password?</a>
    <p>____________________ or ____________________</p>
    <button class="formButtons" id="google">Continue with Google</button>
    <p>New in Up_On? <a href="#" class="signUp">SignUp</a>
    <p>About<a href="#" class="about">About</a>
`

    container.innerHTML = template; 
    return container;
}
