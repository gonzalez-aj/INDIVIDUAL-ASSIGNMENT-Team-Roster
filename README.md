# Welcome to Team Marvel ![Netlify Status](https://api.netlify.com/api/v1/badges/ace94429-7c0c-4e2a-a8ae-4bb8a357c732/deploy-status)
This team roster includes goodies and baddies from the Marvel Universe. 
### [View the App here](https://app.netlify.com/sites/team-roster-gonzalez/deploys)

## Get Started
- get started by looking at [startup readme with instructions on how to clone](./startupReadMe.md)
- Note: this uses Fetch API calls, not axios

## Relevant Links 
- This is the starting point of the data structure [ERD](https://dbdiagram.io/d/63cc2c4c296d97641d7b3493)
- [Mockaroo example of faux data](https://www.mockaroo.com/f443fee0)
- [Basic Wireframes](https://www.figma.com/file/GYEsMwzE4CLMP6CH4aYZuy/TEAM-MARVEL?node-id=0%3A1&t=ZQcxFctluhjnVA75-1)

## About the App
- This app can is for anyone who would like to keep track of their favortie Marvel members
- You can CRUD through each member and search to find your members

## Features
- This app is google authenticated using Firebase
- You can search by role or by name of member

<img width="1043" alt="TEAM MARVEL" src="https://user-images.githubusercontent.com/114124374/215277321-fafafab5-ce15-4628-b8f9-3b83ef2f7a53.png">

## Code Snippet
```
// search bar component with dynamic Next.JS router
export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    // console.warn('e.target.value', e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') router.push(`/search/${searchInput}`);
    setSearchInput('');
  };
```

### Credits
- Thank you for rubber ducking your dynamc routes using Next.JS [Eric!!](https://github.com/ericlfrey)
- Thank you to E21 for guiding me through my errors and [discussion tickets](https://github.com/orgs/nss-evening-web-development/discussions/517)
### Contributors
- [Angie Gonzalez](https://github.com/AngieMGonzalez)✦
