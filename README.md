# Getting started

The challenge details are included in the PDF in the root of this repository. Please add any additional documentation requested to the bottom of this file.

Once completed please raise a Pull Request containing any details you would normally include.

## Backend

We have provided a bootstrapped node/express app, but you're welcome to change this or use any framework of your choice if you would prefer.

To get started:

1. `cd backend`
1. `npm i`
1. `npm run dev` to start the dev server

## Database

We have included JSON and SQL files containing the data within the challenge in a very basic structure, as well as docker compose file containing postgres with the postGIS plugin installed. Please feel free to change or extend one of these schemas based on the data model you see as the best fit for the problem, and to utilise any data store that you feel comfortable with.

To start the database:

1. `cd db`
1. `docker compose up` or `docker-compose up` depending on your installed version

## Frontend

We have provided a bootstrapped React Single Page App powered by Vite, but you're welcome to change this or use any framework of your choice if you would prefer.

To get started:

1. `cd frontend`
1. `npm i`
1. `npm run dev` to start the dev server

# Candidate Content

![](https://github.com/vorboss-hiring/MillieClare180324/blob/main/frontend/src/assets/vorboss_plate.jpg)

(^ I found this on a street near my house!)

Hi!

Firstly, thank you for taking the time to look at my results for this project. Secondly, you can run this application following the above instructions.

## Technologies, libraries & frameworks

### Backend

- I'm using Node as that is what the spec required
- I am using Express since it allows me to set up endpoints very easily and meshes well with Node.
- I am using Postgres (as that's what the spec gave me) because it's a relational database with good support for GIS. There is no requirement for a flexible schema so databases like Mongo just introduce unnecessary complexity.

### Frontend

- I am using React because this is a modern and flexible framework that lets me create and use functional components easily.
- I am using Typescript which will allow me to strictly type my code in order for it to be more robust.
- I am using Vite as it supports React out of the box & starts up really quickly.

## Design decisions and user flows

I am the first to admit that I am not the best designer. However, I wanted the interface to be intuitive and ideally, smooth.

### User flow

- The core functionality is to be able to add a user and to see the result of this operation. This is why the Form component is at the top of the page.
- When the user submits their customer, they recieve a notification below the 'Submit' button which tells them which chamber their customer has been assigned to. If any of the conditions outlines in the specification are met (e.g. all chambers are full), the user will also see an alert.
- I chose alerts because the user has to interact with them before continuing, ensuring that they are acknowledged.
- The table is provided for context, it is ordered by the `used_capacity` column with the Chamber with the most available capacity at the top. It is easy to scan the table for `100` values when they're sorted this way, so the user can quickly estimate how many chambers have available capacity.
- I added in a 'Last reloaded' note so that the user can see how current their view of the data is. This might be important if multiple users are entering data at the same time.

- I considered but didn't add a map. A map would be useful for determining gaps in capacity etc but not directly useful to a user entering customer data.

### The UI layout

- Consists of the Table and Form as separate components.
- The Table reloads when the 'Submit' button is pressed, ensuring that the overview of the containers will always reflect the database

### The colour scheme and fonts:

- The two colours are 'Coyote' (#d3976f) and 'Botanical Night' (#0c4444). Coyote is the colour closest I could get to the neutral orange shade of the Vorboss logo, and Botanical Night is the colour I believe to be used in the header at the top of the Vorboss homepage.
- As for the font, I chose [Red Hat Display](https://fonts.google.com/specimen/Red+Hat+Display), a sans-serif font that I thought looked close to the one used on the Vorboss website.


## Finally
I have included a demo for the page below.
![](https://github.com/vorboss-hiring/MillieClare180324/blob/main/frontend/src/assets/project-test.gif)
