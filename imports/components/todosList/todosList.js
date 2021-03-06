import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../api/tasks.js';
import template from './todosList.html';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    this.subscribe('tasks');

    this.helpers({
      tasks() {
        // Show newest tasks at the top
       return Tasks.find({}, {
         sort: {
           createdAt: -1
         }
       });
     },
      currentUser() {
        return Meteor.user();
      }
    })
  }
  addTask(newTask) {
   // Insert a task into the collection
   Tasks.insert({
     text: newTask,
     createdAt: new Date,
     owner: Meteor.userId(),
     username: Meteor.user().username
   });

   // Clear form
   this.newTask = '';
 }
 setChecked(task) {
    // Set the checked property to the opposite of its current value
    Tasks.update(task._id, {
      $set: {
        checked: !task.checked
      },
    });
  }
  removeTask(task) {
    Tasks.remove(task._id);
  }
}

export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });
