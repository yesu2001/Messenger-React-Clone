import React, { Component } from 'react'
import './Tracker.css';
import fire from '../../Config/Firebase.js';
import Transaction from './Transaction/Transaction';

export class Tracker extends Component {
    
    state = {
        transactions: [],
        money: 0,

        transactionName: '',
        transactionType: '',
        price: '',
        currentUID: fire.auth().currentUser.uid
    }

    // Logout function
    logout = () => {
        fire.auth().signOut();
    }

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value !== '0' ? e.target.value : ""
        });
    }

    // Add new Transaction
    addNewTransaction = () => {
        const {transactionName,transactionType,price,currentUID,money} = this.state;

        // validation
        if(transactionName && transactionType && price) {
            const BackUpState = this.state.transactions;
            BackUpState.push({
                id: BackUpState.length + 1,
                name: transactionName,
                type: transactionType,
                price: price,
                user_id: currentUID
            });

            fire.database().ref('Transactions/' + currentUID).push({
                id: BackUpState.length,
                name: transactionName,
                type: transactionType,
                price: price,
                user_id: currentUID
            }).then((data) => {
                // successfull callback
                this.setState({
                    transactions: BackUpState,
                    money: transactionType === 'deposit' ? money+ parseFloat(price) : money-parseFloat(price),
                    transactionName: '',
                    transactionType: '',
                    price: ''
                })
            }).catch((error) => {
                // error callback
                console.log("error",error)
            })
        }
    }
    
    componentWillMount() {
        const {currentUID,money} = this.state;
        let totalMoney = money;
        const BackUpState = this.state.transactions;
        fire.database().ref('Transaction/' + currentUID).once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                totalMoney = childSnapshot.val().type === 'deposit' ? parseFloat(childSnapshot.val().price) + totalMoney : totalMoney - parseFloat(childSnapshot.val().price);
                BackUpState.push({
                    id: childSnapshot.val().id,
                    name: childSnapshot.val().name,
                    type: childSnapshot.val().type,
                    price: childSnapshot.val().price,
                    user_id: childSnapshot.val().user_id
                });
            });
            this.setState({
                transactions: BackUpState,
                money: totalMoney
            })
        })
    }

    render() {
        var currentUser = fire.auth().currentUser;
        return (
            <div className="tracker">
                <div className="welcome">
                    <span> Hi, {currentUser.displayName} </span>
                    <button className="exit" onClick={this.logout}>Exit</button>
                </div>
                <div className="totalMoney">Rs.{this.state.money}</div>
                <div className="newTransactionBlock">
                    <div className="newTransaction">
                        <form>
                            <input onChange={this.handleChange('transactionName')}
                                value={this.state.transactionName} type="text" placeholder="Transaction name" name="transactionName" />
                            <div className="InputGroup">
                                <select name="type" onChange={this.handleChange('transactionType')} value={this.state.transactionType}>
                                    <option value="0">Type</option>
                                    <option value="expense">Expense</option>
                                    <option value="deposit">Deposit</option>
                                </select>
                                <input onChange={this.handleChange('price')} value={this.state.price} type="text" placeholder="price" name="price" />
                                

                            </div>
                        </form>
                        <button onClick={() => this.addNewTransaction()} className="addTransaction">Add Transaction</button>
                    </div>
                </div>
                <div className="latestTransactions">
                    <p>Latest Transaction</p>
                    <ul>
                        {
                           Object.keys(this.state.transactions).map((id) => (
                                <Transaction key={id}
                                    type={this.state.transactions[id].type}
                                    name={this.state.transactions[id].name}
                                    price={this.state.transactions[id].price}
                                />
                            )) 
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Tracker
