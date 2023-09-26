# QuestN

QuestN is a social media website for building gaming communities. Users are encouraged to post about their experiences with what they are currently playing, in addition to leaving hints for other players. The app is built upon a Supabase back-end, and utilises core React, along with React Query, to interface with the back-end data. Expected features as standard across modern social media are present, including different feeds, search functionality, user pages, and realtime messaging.

# Important Notes

If you are working on this Project and require access for installation/development, contact the owner for the Supabase API Key

## Installation

Pull or Download the Repository to local machine

Create your local .env file and add the Supabase API Key to this file

```yaml
VITE_SUPABASE_KEY=API_KEY
```

Run commands

```bash
npm install
npm run dev
```

## Technical Configuration

### Website

[https://questlogger.netlify.app](https://questlogger.netlify.app)

### Hosting

[Netlify Admin](https://app.netlify.com/sites/questlogger/overview)

The Live Website is hosted on Netlify currently, visit the questlogger Admin Page to manage the website configuration, such as setting up Environment Variables.

### SMTP Server

[Brevo SMTP](https://app.brevo.com/)

Email Distribution is handled by Brevo. The Domain in use for Emails is thunderfrost.com. Please ensure that these details remain up to date, and that if any DNS configuration within Brevo changes, then this is updated in the DNS Records for thunderfrost.com.

### Domain

[Netlify DNS Panel](https://app.netlify.com/teams/brookegodbold13/dns/thunderfrost.com)

The thunderfrost.com Domain Registrar is Netlify. Ensure that DNS Records are managed and kept up to date, to ensure that emails from Brevo can continue to be sent.

### Back-End

[Supabase Admin](https://supabase.com/dashboard/project/xhkwznfhytvgvorvkcdp)

The Database is provided by Supabase, and the Database can be managed in the Admin Panel for quest-log. The Domain in use for Emails is thunderfrost.com.
