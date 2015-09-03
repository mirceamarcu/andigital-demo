# Clone

```shell
    $ git clone https://github.com/mirceamarcu/andigital-demo.git
    $ cd andigital-demo
```

# Setup

After you clone the project please install (if you don't already have) [nodejs](https://nodejs.org/en/) and [npm](npmjs.com) (*if it isn't installed automatically*). Then please use the following commands to install the *nodejs* and front-end dependencies:

```shell
    $ npm install
    $ npm install gulp -g
    $ npm install bower -g
    $ bower install
```

To build the solution use the following [gulp](www.gulpjs.com) task:

```shell
    $ gulp build
```

# Development

To power up the devlopment server simply call

```shell
    $ gulp
```

Automatically a new brwoser will be opened on the [localhost:8000](http://localhost:8000) address.

# My approach 

For my solution I have chosen [AngularJS](angularjs.org) for my JavaScript MVC framework and [Bootstrap](http://getbootstrap.com/) for my CSS framework. My application is structured under the MVC architecture pattern.
AngularJS offers a module system out of the box so I have sturctured my applications into multiple smaller *components*: `map` and `venues`. Each of these componenets uses an MVC approach.

### Map component
The map component uses [Google's Maps API](https://developers.google.com/maps/documentation/javascript/) to handle the *"geolocation"* heavy lifting. This component exposes a `<map></map>` *[(directive)](https://docs.angularjs.org/guide/directive)* custom element to use in your DOM. The component generates a full interactive **Google Maps** map. By default, the map's location will be your current location. 

**Info:** *The app will ask for geolocation permisions.* 

The map component also has a `mapManager` which is an Angular Service. The `mapManager` exposes a public method for communicating with the map element. The method is called `mapManager.addPointers([,args])` which notifies the map directive via a `$broadcast` event that the map should render marks for each coordinates object from the list. 

This approach let us decouple the map's ability to communicate with other obejcts/actions in the application. It can also be used as a stand alone module in other applications. The rendering part is strictly handled by the `map` *directive* and the outter communication is handled by the `mapManager`.

### Venues component.

The venus component uses [Foursquare's API](https://developer.foursquare.com/) to handle the venus search part. For us to render a map with marked locations we first need the geo coordinates of those locations. Here is where the API helps us.

The module is build out of 3 main files:


##### venues-model.js

Here is the model of our venus logic. The model handles the data which comes from the API. The data is fetched via a `GET` request to the API, based on the location entered in the view's input. The data is then processed into an array wich contains only the bare minimum for us to render the map: `longitute`, `latitude`, `name` etc.

To retrive the venu array, the model exposes this function: ```venuModel.getList('Luxemburg');```

##### venues-controller.js

The venues controller handles the interaction with the view. When the user enters a location into the **search input** and hits *enter* or clicks, the search button, the controller uses the `venus-model` to fetch the data and then notifies the `map` component via the `mapManager` that it needs to render the marks for the nearby venus. 

##### venues.html

This is the venus HTML where we initiate the controller and show the search input.

### Main files

The whole app is fired up in the `app.js` file. Which inclues the and `venues` component and the main view is `index.html` which initiates the Angular app with the `ng-app` attribute.

