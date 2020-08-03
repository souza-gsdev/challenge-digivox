import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import DashBoard from '../pages/DashBoard';
import Location from '../pages/Location';
import LocationAdd from '../pages/LocationAdd';
import Booking from '../pages/Booking';
import BookingAdd from '../pages/BookingAdd';
import Customer from '../pages/Customer';
import CustomerAdd from '../pages/CustomerAdd';
import Item from '../pages/Item';
import ItemAdd from '../pages/ItemAdd';
import TypeItem from '../pages/TypeItem';
import TypeItemAdd from '../pages/TypeItemAdd';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={DashBoard} />
      <Route exact path="/location" component={Location} />
      <Route path="/location-add" component={LocationAdd} />
      <Route exact path="/booking" component={Booking} />
      <Route path="/booking-add" component={BookingAdd} />
      <Route exact path="/customer" component={Customer} />
      <Route path="/customer-add" component={CustomerAdd} />
      <Route exact path="/items" component={Item} />
      <Route path="/items-add" component={ItemAdd} />
      <Route exact path="/types" component={TypeItem} />
      <Route path="/types-add" component={TypeItemAdd} />
    </Switch>
  );
}
