---
layout: post
title: Rails 5 User Registration With Devise, Vue.js, and Axios
type: post
date: "2017-03-18 12:36:33"
categories: articles
---
As I’m writing this it’s 2017 and there is a solid chance your apps use [Vue](https://vuejs.org/), [React](https://facebook.github.io/react/), or [Angular](https://angularjs.org/) on the front-end. I was recently working on an app that uses Vue and [Rails 5](http://rubyonrails.org/) together. The app has a Vue component where administrators can create new users. The new user’s credentials are sent to the Rails server through a POST request from [Axios](https://github.com/mzabriskie/axios). The Rails app then uses the powerful and flexible [Devise](https://github.com/plataformatec/devise) gem to handle user creation and authentication.

It required a bit of research to learn how to successfully implement this workflow. I’d like to share a few lessons learned in setting this up. Most of the Devise “how to” articles assume you’re using the standard ERB templates that come with the gem, which is obviously antiquated in the new JavaScript heavy world we code in.

## Configuring Axios

Axios acts as the HTTP client for Vue. All form submissions and data retrieval from the backend are made possible with Axios. When you’re working in Vue it’ll be among the most important packages you’ll rely upon. There are other good HTTP clients available in the JavaScript community but I’ve found Axios to be my favorite.

A few small tweaks are needed when importing Axios into your Vue App. These tweaks rely on Axios’ ability to set defaults for use in every request:

```js
import Vue from 'vue'
import axios from 'axios'

let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'
```

**Explanation:**

- Import the Vue and Axios packages when creating a new Vue app.
- Access the CSRF token that Rails displays in a meta tag towards the top of the `application.html.erb` file and save it as a variable.
- Tell Axios that every request should include the `X-CSRF-Token` header with the saved token.
- Tell Axios that every request should include an `Accept` header that only allows JSON as the desired response.

These configuration defaults tell Rails that requests are valid by including the CSRF Token and that all responses should be formatted as JSON. Axios sets the `Accept` header to include *ALL MIME TYPES* out of the box! This is bad for a number of reasons but easily corrected by specifying the configuration default shown in the example. Devise will read this header and return the proper response. If you don’t specify JSON, Devise will send back HTML which is useless to your Vue app.

## Configuring Devise

Devise is one of the more flexible gems for handling user authentication and registration in the Rails ecosystem. It only requires that one controller be customized to accommodate the registration request sent from Vue.

First, edit the `routes.rb` file to enable Devise and specify that there is a custom registration controller:

{% raw %}
```ruby
# routes.rb

Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations' }
  root 'home#index'
end
```
{% endraw %}

Then, edit the custom registration controller to allow an authenticated administrator to create a new user from Vue:

{% raw %}
```ruby
# app/controllers/registrations_controller.rb

class RegistrationsController < Devise::RegistrationsController
  before_action :authenticate_user!, :redirect_unless_admin, only: [:new, :create]
  skip_before_action :require_no_authentication

  clear_respond_to
  respond_to :json

  private

  def redirect_unless_admin
    head :unauthorized unless current_user.try(:admin?)
  end

  def sign_up(_resource_name, _resource)
    true
  end
end
```
{% endraw %}

This controller is mostly copied from a [Stack Overflow answer](http://stackoverflow.com/a/36209399/1678740) where a good explanation of the code is already discussed. It is essentially adjusting Devise’s filters to allow an authenticated administrator to create a user then respond to the request with JSON if the front-end client specifies it in the `Accept` header. We’ve already configured Axios to ask for a JSON response so now Vue and Rails are speaking to each other nicely. You don’t need to make any further changes to Devise. You may be tempted to edit the `devise.rb` initializer in hopes of troubleshooting this workflow but that isn’t necessary and in some cases may break things.

## Conclusion

In this article I’ve only covered adding a new user through a Vue front-end as an administrator. However, this same concept can easily be applied to authenticating new sessions, editing user information, and allowing users to register on their own. Once Axios is configured properly to communicate with Devise it’s only a matter of overriding the gem’s controllers to achieve whatever functionality you want.
