# powr-e2e-tests
## E2E tests for POWR.io using Playwright 

To run this project on your local machine, clone this project by clicking the green "<> Code" button in the upper right side of the page and choosing your preferred method. If you choose to download the Zip file, please extract it on a known location. 

You need to have [Node.Js](https://nodejs.org/) installed on your machine. The latest LTS version is preferred.

Then open the Terminal application from your Operating System, and navigate to the folder containing the project. Run the command:

```
npm install
```

After completing the installation, you need to manually enter the login credentials on the platform in order to save the login cookies for all the tests. You can run the following command on the terminal:

```
npm run get-auth
```

The login page will be opened in Chrome, along with a small Playwright window, which you can ignore by now. 


> [!NOTE]
> The elements will get colored as you hover the mouse over them; this is normal behavior.

Enter the credentials provided via email (`email` and `password`), click `Log In`, and **close the browser** after the login was successful. 

After doing this process, you can run the tests using the command:

```
npx playwright test
```

The results will be shown on the terminal screen.


### Overview about this test suite

The tests are located in the `/tests` folder. For now I have not included any Page Object files; all the element locators and movement methods are on the same file and, this organization is an important step right after the POC is approved.

I have included comments in the file `challenge.spec.ts` explaining the steps to each major part of the tests.

During the challenge, I had some setbacks because of the Captcha system implemented on the Log In page. After much research, I reached the conclusion that there are a few ways to work around captchas on a real working scenario:

> 1 - We can get past the login page by sending an API request to get a valid auth token every time the test runs, even on a CI pipeline. This requires in-depth knowledge of the login process at code level.
>
> 2 - We can run the tests on a Test or Staging environment with disabled Captcha (preferred), or with a valid test token that does not expire. This scenario would be ideal.
>
> 3 - We can manually log in and use playwright to save the session cookies locally, then use these cookies to perform subsequent tests on the logged area. This is a last measure approach to run or debug the tests, and doesn't allow for CI/CD tests as it requires manual intervention.

For now I decided to go with the **third approach** as it is the simplest, given the specific scenario presented in this challenge.

The second approach would be my go-to solution had I been working within the company, since it places the automated tests on a suitable environment.

If you have any further questions, please, feel free to contact me over email.

Thanks!