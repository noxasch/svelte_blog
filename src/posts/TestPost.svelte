
<style>
  .post__title {
    font-family: 'Noto Serif', Times, serif;
    display: block;
    color: #424242;
  }

  @media (prefers-color-scheme: dark) { 
    .post__title{
      color: #b1b1b1;
    }
  }

  @media (max-width: 800px) { 
    .post__title{
      font-size: 2.4rem;
    }

  }

  .post__meta {
    font-family: 'Noto Serif', Times, serif;
    font-size: 1.4rem;
    color: #737373;
  }

  pre {
    display: block;
    border-radius: 5px;
    padding: 2rem 2.4rem;
  }

   @media (max-width: 800px) {
     pre {
      padding: 2rem 1rem;
     } 
    }

  pre, code {
    font-size: 1.4rem;
    line-height: 1.5;
  }

  p {
    margin-bottom: 1.6rem;
  }

  p > code {

      font-family: inherit;
      font-size: inherit;
      color: #abb2bf; 
      background: #282c34; 
      display: inline-block;
      padding: 0.1em 0.5em;
      text-indent: 0;
  }

  h2 {
    font-weight: 600;
    font-family: Montserrat, sans-serif;
    font-size: 2.2rem;
    margin-top: 4rem;
    margin-bottom: 1.6rem;
  }
  
</style>


<h1 class="post__title">Automate Your Flutter Release with Github Action While Keeping Your Secret Safe</h1>
      <div class="post__meta">
        Apr 21, 2021 
        &bull;
        9 min read
      </div>
      <h2 class="anchor-head" id="what-will-be-covered">What will be covered</h2>
<p>Flutter App Android CICD for personal project. Improvement is needed for professional usage.</p>
<h2 class="anchor-head" id="notes">Notes</h2>
<p>Follow the steps on the branch you are planning to use the action. I used this action on a separate branch. If you are planning to use the action on the same branch as your working branch, make sure to follow this section.</p>
<h2 class="anchor-head" id="flutter-cicd-&amp;-github-action">Flutter, CICD, &amp; Github Action</h2>
<p>Releasing your first flutter app is exciting. Watching all the unit test and wigdet test pass, building the appbundle or apk and then uploading it to playstore or appstore. But continously doing this manually is tiresome. So in this journey, i wanted to automate the task, with the goal to publish to appstore with just a push or tag added.</p>
<p>As a rule of thumb, before doing any release or publishing, always run unit test, widget test and test it on actual device (integration test).</p>
<p>However in this post, i'm not going to cover on including integration test because for my personal project, i always test it on my own device for a couple of days before release. IMO for personal project, unit and widget test with self test on actual device is enough. But for professional project or a company, it is best to include integration test in the step.</p>
<p>Also i commented <code>flutter analyze</code> and <code>flutter format --set-exit-if-changed</code> because for my workflow, i already tested the code locally and my intention is to publish to playstore on git tag. <code>flutter format</code> is recommended as you don't have to manually format your code and it will automatically format your code to a standard flutter code. This is really helpful when you are working in a team.</p>
<h2 class="anchor-head" id="github-action">Github Action</h2>
<p>As you know, github action is one of the tools that can be use to automate software development workflow. Whenever an events (github event) such as <code>pull request</code> or <code>push</code>occur we can use it to trigger an actions set. These actions are run inside a container. We can set the action by creating file inside creating these folder inside project folder <code>.github/workflows</code> and push it to github. Github will automatically recognize these folder and file. Free github account are given 2,000 actions minutes , which means that cumulative of each of your github actions for all repo are 2,000 minutes. For example a simple flutter project might take about 2 minutes from test to build, and as the project go the action might take about 10 minutes.</p>
<p>Github Action Quota can be access at github <code>Settings &gt; Billing &amp; Plans</code>.</p>
<p>Github action can be accessed from the repo page as below.</p>
<p><img src="https://noxasch.tech/blog/automate-your-flutter-release-with-github-action-while-keeping-your-secret-safe/github_action.png" width="1000"/></p>
<h2 class="anchor-head" id="understand-github-action-billings">Understand Github Action Billings</h2>
<ul>
<li>Free action: 2,000 minutes (free for public repo)</li>
<li>Free Storage for Action and Packages: 0.5GB (free for public repo)</li>
</ul>
<h3 class="anchor-head" id="action-minutes">Action Minutes</h3>
<p>Is pretty generous and hard to reach if you set proper trigger and action for project might take about from less than a minutes to 10 minutes.</p>
<h3 class="anchor-head" id="storage-for-action-and-packages">Storage for Action and Packages</h3>
<p>Include action logs and artifacts, which can be easily exceed if not monitor ed properly. What you can do is to set lower retention for action log and artifacts. Or do not upload artifact at all to github. </p>
<p>Consider comment out or remove the <code>create github artifact release</code> block to mitigate exceeding the limit unecessarily as you can always <code>git checkout</code> and create the release locally if needed.</p>
<p><code>Project Repo &gt; Settings &gt; Artifact and log retention</code> <br/>
(*new log retention duration does not apply to existing log and artifact)</p>
<h2 class="anchor-head" id="requirement_1">Requirement</h2>
<ul>
<li>Github Account</li>
<li>Setup Android Keystore (to generate signed apk and appbundle)</li>
</ul>
<h2 class="anchor-head" id="continuous-integration">Continuous Integration</h2>
<p>In this part, we want to make sure all test are passed, and build the release. Assuming you have your Android Keystore ready (if not follow: <a href="https://flutter.dev/docs/deployment/android#signing-the-app" rel="noopener noreferrer nofollow" target="_blank">https://flutter.dev/docs/deployment/android#signing-the-app</a> ).</p>
<p>*add explanation for each steps</p>
<h3 class="anchor-head" id="step-1:-configure-your-build.gradle">Step 1: Configure your build.gradle</h3>
<p>Go to <code>project-folder/android/app/build.gradle</code> and make sure your signing config are as follow:</p>
<pre><code class="language-java" lang="java">signingConfigs &#123;
  release &#123;
      keyAlias System.getenv("ALIAS_PASSWORD")
      keyPassword System.getenv("KEY_PASSWORD")
      storeFile System.getenv("KEY_PATH") ? file(System.getenv("KEY_PATH")) : null
      storePassword System.getenv("KEY_PASSWORD")
  &#125;
&#125;</code></pre>
<h3 class="anchor-head" id="step-2:-add-the-secret-as-repo-secret">Step 2: Add the secret as Repo Secret</h3>
<p>To keep our keystore and all our secrets safe, make sure to add the keyfile.jks in the gitignore and never upload any secrets to version control system.</p>
<ol>
<li>First you want to get the base64 blob of your Android Keystore from the <code>.jks</code> file. (on windows you can get openssl for windows by google from here  <a href="https://code.google.com/archive/p/openssl-for-windows/downloads" rel="noopener noreferrer nofollow" target="_blank">https://code.google.com/archive/p/openssl-for-windows/downloads</a>). Run the command in your terminal as below and this will output base64 encoded blob. </li>
</ol>
<pre><code class="language-bash">openssl base64 -in key.jks </code></pre>
<p>Copy this blob and open your project repo on github, go to repo <code>Settings &gt; Secrets &gt; New Repository Secret</code>. Paste the base 64 blob as 
<em>Value</em> and <code>KEY_JKS</code> as <em>Name</em>.</p>
<p>Create two more new secret as follow and replace the value with your own:</p>
<p>Name: KEY_PASSWORD<br/>
Value: YOUR_KEYSTORE-PASSWORD</p>
<p>Name: ALIAS_PASSWORD<br/>
Value YOUR-PASSWORD-ALIAS</p>
<h2 class="anchor-head" id="step-3:-writing-the-action_1">Step 3: Writing The Action</h2>
<p>a. First we set how we are going to trigger the action which in this case whenever we push a tag.</p>
<p>b. Then we write the job, we are going to run this in <code>ubuntu-latest</code> and set our environment variables. (these are temporary and will be deleted during the cleanup at the end of the action)</p>
<p>c. Then we use <code>actions/checkout@v2</code> to set our project folder as current directory.</p>
<p>d. We are going to use java jdk-8 which is the same version as Android Studio.</p>
<p>e. Then <code>echo $KEY_JKS | base64 -di &gt; key.jks</code> will create the key inside the project folder from our secrets that we store on Step 2. (these are temporary and will be deleted during the cleanup at the end of the action) (Notes: never upload or push any key or secret to github or any version control system)</p>
<p>f. Then we use <code>subosito/flutter-action@v1</code> to run our flutter command. Change flutter version as you needed for your project.</p>
<p>g. After we ran all flutter command, we have our appbundle and apks so we need to store it temporarily.</p>
<p>h. Next we will uploads the apks and appbundle into github release using the release tag that we pushed earlier. You can omit this part if you don't want to save it as your github release.</p>
<p>For this we are done with this integration section. Next we are going to continue in the deployment section where we add a couple more line to upload to playstore.</p>
<pre><code class="language-yaml">name: Flutter CICD # action name

on:
  push:
    tags:
      - "v*"
  # push:
  #   branches: [ android-stable ]

jobs:
  build: # job's name
    runs-on: ubuntu-latest # container os
    env: # ADD environment variables
      KEY_JKS: $&#123;&#123; secrets.KEY_JKS &#125;&#125;
      KEY_PATH: $&#123;&#123; github.workspace &#125;&#125;/key.jks
      KEY_PASSWORD: $&#123;&#123; secrets.KEY_PASSWORD &#125;&#125;
      ALIAS_PASSWORD: $&#123;&#123; secrets.ALIAS_PASSWORD &#125;&#125;
    steps:
      - uses: actions/checkout@v2 # cd to current dir
      - uses: actions/setup-java@v2
        with:
          distribution: 'adopt' # See 'Supported distributions' for available options
          java-version: '8'
      - name: Create key file
        run: echo $KEY_JKS | base64 -di &gt; key.jks
      - uses: subosito/flutter-action@v1
        with:
          flutter-version: '2.0.4' # change accordingly
      - run: flutter pub get
      # Statically analyze the Dart code for any errors.
      # - run: flutter analyze
      # Check for any formatting issues in the code.
      # - run: flutter format --set-exit-if-changed .
      - run: flutter test
      - run: flutter build apk --release --split-per-abi
      - run: flutter build appbundle
      - name: Create github artifact release # disable this to save storage
        uses: ncipollo/release-action@v1
        with:
          artifacts: "build/app/outputs/apk/release/*.apk,build/app/outputs/bundle/release/app-release.aab"
          token: $&#123;&#123; secrets.GITHUB_TOKEN &#125;&#125; # this is automatically provided by github
          commit: $&#123;&#123; github.sha &#125;&#125;
      - name: Upload app bundle artifact
        uses: actions/upload-artifact@v2
        with:
          name: appbundle
          path: build/app/outputs/bundle/release/app-release.aab</code></pre>
<h2 class="anchor-head" id="deployment">Deployment</h2>
<p>For deployment we want to use the release that we generate from previous step and use it to upload to plasytore console. This is part of the same file to reduce action's time.</p>
<ol>
<li>
<p>Go to https://play.google.com/console/api-access or On playstore Console <code>Settings &gt; Developer account &gt; API access</code></p>
</li>
<li>
<p>Accept the Terms of Service</p>
</li>
<li>
<p>Click Create new project. An API project will be automatically generated and linked to your Google Play Console.</p>
</li>
<li>
<p>Under Service Accounts, click Create Service Account</p>
</li>
<li>
<p>Follow the instructions on the page to create your service account.</p>
</li>
<li>
<p>Now go to <code>Users &amp; Permission</code> and invite the service account using the invite user form and set release permission</p>
</li>
<li>
<p>Add the json key generated as github repo secrets</p>
</li>
<li>
<p>Add <code>project_root/distribution/whatsnew</code> directory in project root and add <code>whatsnew-en-US</code> for each language with no exension</p>
</li>
</ol>
<pre><code class="language-yaml">  release:
    name: Upload App to Playstore
    needs: [ build ]
    runs-on: ubuntu-latest
    steps:
    - name: cd to current directory
    - uses: actions/checkout@v2
    - name: Get appbundle from artifacts
      uses: actions/download-artifact@v2
      with:
        name: appbundle
    - name: Release app to internal track
      uses: r0adkll/upload-google-play@v1
      with:
        serviceAccountJsonPlainText: $&#123;&#123; secrets.PLAYSTORE_ACCOUNT_KEY &#125;&#125;
        packageName: com.noxasch.hari_date_tracker
        releaseFile: app-release.aab
        track: internal
        whatsNewDirectory: distribution/whatsnew # file path from project root</code></pre>
<h2 class="anchor-head" id="using-the-same-configuration-on-local">Using the same configuration on local</h2>
<p>To make sure things works locally as well, you must place your keystore inside your project folder for example <code>my-project/key.jks</code>.</p>
<p>Add your keystore password and alias in the environment variables as in Step 2.</p>
<h2 class="anchor-head" id="things-to-consider">Things To Consider</h2>
<p>For a startup or professionally, you may want to include <code>Integration Test</code>, <code>flutter format  --set-exit-if-changed</code>, <code>flutter analyze</code> and <code>Code Coverage</code> in the Github Action. So it is better to run the test on <code>macos-latest</code> where you can easily include Android and iOS emulator for integration test.</p>
<h2 class="anchor-head" id="full-action-code">Full Action Code</h2>
<pre><code class="language-yaml">name: Flutter CICD # action name

on:
  push:
    tags:
      - "v*"
  # push:
  #   branches: [ android-stable ]

jobs:
  build: # job's name
    runs-on: ubuntu-latest # container os
    env: # ADD environment variables
      KEY_JKS: $&#123;&#123; secrets.KEY_JKS &#125;&#125;
      KEY_PATH: $&#123;&#123; github.workspace &#125;&#125;/key.jks
      KEY_PASSWORD: $&#123;&#123; secrets.KEY_PASSWORD &#125;&#125;
      ALIAS_PASSWORD: $&#123;&#123; secrets.ALIAS_PASSWORD &#125;&#125;
    steps:
      - uses: actions/checkout@v2 # cd to current dir
      - uses: actions/setup-java@v2
        with:
          distribution: 'adopt' # See 'Supported distributions' for available options
          java-version: '8'
      - name: Create key file
        run: echo $KEY_JKS | base64 -di &gt; key.jks
      - uses: subosito/flutter-action@v1
        with:
          flutter-version: '2.0.4' # change accordingly
      - run: flutter pub get
      # Statically analyze the Dart code for any errors.
      # - run: flutter analyze
      # Check for any formatting issues in the code.
      # - run: flutter format --set-exit-if-changed .
      - run: flutter test
      - run: flutter build apk --release --split-per-abi
      - run: flutter build appbundle
      - name: Create github artifact release # disable this to save storage
        uses: ncipollo/release-action@v1
        with:
          artifacts: "build/app/outputs/apk/release/*.apk,build/app/outputs/bundle/release/app-release.aab"
          token: $&#123;&#123; secrets.GITHUB_TOKEN &#125;&#125;# this is automatically provided by github
          commit: $&#123;&#123; github.sha &#125;&#125;
      - name: Upload app bundle artifact
        uses: actions/upload-artifact@v2
        with:
          name: appbundle
          path: build/app/outputs/bundle/release/app-release.aab
    release:
      name: Upload App to Playstore
      needs: [ build ]
      runs-on: ubuntu-latest
      steps:
      - name: cd to current directory
      - uses: actions/checkout@v2
      - name: Get appbundle from artifacts
        uses: actions/download-artifact@v2
        with:
          name: appbundle
      - name: Release app to internal track
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: $&#123;&#123; secrets.PLAYSTORE_ACCOUNT_KEY &#125;&#125;
          packageName: com.noxasch.hari_date_tracker
          releaseFile: app-release.aab
          track: internal
          whatsNewDirectory: distribution/whatsnew # file path from project root</code></pre>
<h2 class="anchor-head" id="conclusion">Conclusion</h2>
<h2 class="anchor-head" id="references">References</h2>
<ul>
<li>https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions</li>
<li>https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#environment-variables</li>
<li>https://docs.github.com/en/actions/reference/environment-variables</li>
<li>https://github.com/iqan/flutter-ci-github-actions-demo/blob/master/.github/workflows/android-playstore-release.yml</li>
<li>https://gist.github.com/dllewellyn/90dae62988457b25277b8e4c4291e7db#file-github_actions_release-yaml</li>
</ul>
