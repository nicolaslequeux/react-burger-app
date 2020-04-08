import React, { Component } from "react";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import Order from "../../components/Order/Order";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
    .then(res => {
      // Je crée une helper methode pour mettre mes objets dans une array
      const fetchedOrders = []; 
      for (let key in res.data) {
        // solution #1
        // fetchedOrders.push(res.data[key]);
        // SOlution #2: je distribue l'object avec tous ces propriétés dont l'id que je compte réutiliser
        fetchedOrders.push({
          ...res.data[key],
          id: key // J'ajoute la propriété 'id' créée par firebase
        });
      }
      // console.log("this.state.orders: ", fetchedOrders);
      this.setState({loading: false, orders: fetchedOrders})
    })
    .catch(error => {
      this.setState({loading: false})
    });
  }

  render() {
    return (
      <div>
        { this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price} // Convert string to number
          />
        ))}
      </div>
    )
  }

}

export default withErrorHandler(Orders, axios);


// return this.props.persons.map((person, index) => {
//   return (
//     <Person
//       key={person.id}
//       click={() => this.props.clicked(index)}
//       changed={(event) => this.props.changed(event, person.id)}
//       name={person.name}
//       age={person.age} />
//   );
// });