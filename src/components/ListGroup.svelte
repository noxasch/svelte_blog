<script>
  import ListItem from './ListItem.svelte';

  let posts = [
    {
      title: 'Automate Your Flutter Release with Github Action While Keeping Your Secret Safe',
      url: 'https://noxasch.tech/blog/automate-your-flutter-release-with-github-action-while-keeping-your-secret-safe/',
      date: new Date(2021, 3, 21)
    },
    {
      title: 'Automate Your Flutter Release with Github Action While Keeping Your Secret Safe',
      url: 'https://noxasch.tech/blog/automate-your-flutter-release-with-github-action-while-keeping-your-secret-safe/',
      date: new Date(2021, 3, 21)
    },
    {
      title: 'Automate Your Flutter Release with Github Action While Keeping Your Secret Safe',
      url: 'https://noxasch.tech/blog/automate-your-flutter-release-with-github-action-while-keeping-your-secret-safe/',
      date: new Date(2021, 3, 21)
    },
    {
      title: 'Automate Your Flutter Release with Github Action While Keeping Your Secret Safe',
      url: 'https://noxasch.tech/blog/automate-your-flutter-release-with-github-action-while-keeping-your-secret-safe/',
      date: new Date(2021, 3, 21)
    },
    {
      title: 'Automate Your Flutter Release with Github Action While Keeping Your Secret Safe',
      url: 'https://noxasch.tech/blog/automate-your-flutter-release-with-github-action-while-keeping-your-secret-safe/',
      date: new Date(2021, 3, 21)
    },
  ]
</script>

<ul>
  {#each posts as post}
    <ListItem title={post.title} {...post} />
  {/each}
</ul>