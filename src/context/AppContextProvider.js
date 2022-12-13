import React from 'react';
import {AppContext} from './app-context';
import Storage from "../services/store";
import Api from "../services/api";
import Loader from "../components/loader/Loader";
import {withRouter} from 'react-router-dom';

class AppContextProvider extends React.Component{
    state = {
        contacts:[],
        isLoading:true,
        token:null
    }

    componentDidMount() {
        const token = Storage.getToken();
        if(token){
            Api.getAllContacts(token)
                .then(response => {
                    console.log(response);
                    this.setState({
                        isLoading:false,
                        contacts:response.data.contacts,
                        token
                    });
                }).catch(error => {
                this.setState({
                    isLoading:false,
                    token
                });
            });
        }else{
            this.setState({isLoading:false});
        }
    }

    addContact = contact => {
        this.setState({isLoading:true});
        Storage.addContact(contact).then(()=>{
            const arr = [...this.state.contacts,contact];
            this.setState({
                isLoading:false,
                contacts: [...arr]
            });
            this.props.history.push("/");
        }).catch(error => {
            this.setState({isLoading:false});
        })
    }

    render() {
        return(
            <AppContext.Provider value={{
                contacts:this.state.contacts,
                addContact:this.addContact
            }}>
                {this.props.children}
                {this.state.isLoading && <Loader/>}
            </AppContext.Provider>
        );
    }
}

export default withRouter(AppContextProvider);