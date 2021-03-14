'''
UNMOCKED UNIT TEST FOR SERVER-SIDE APPLICATION
    Each test should extend unittest.TestCase
    Each test should test logic of 1 unique function in your app, not start up a local Flask server or test socket.io functionality
    Each test should have 3+ test cases and 2+ assert statements, and pass when ran
    https://docs.python.org/2/library/unittest.html


'''
import unittest
import unittest.mock as mock
from unittest.mock import patch
import os 
import sys

sys.path.append(os.path.abspath('../../'))
from app import on_connect, on_disconnect
import models

KEY_INPUT = "jaymee"
KEY_EXPECTED = "expected"
NEW_KEY_EXPECTED = "expected2"
INITIAL_USERNAME = 'user1'

class updateConnectTestCase(unittest.TestCase):
    #print("nothing to see")
    def setUp(self):
        #print('setup')
        self.success_test_params = [
            {
                KEY_INPUT: '',
                KEY_EXPECTED: 'User connected!',
                NEW_KEY_EXPECTED: 'User disconnected!',
            },
            
        ]
        
    def test_success(self):
        #print("Testing")
        for test in self.success_test_params:
            actual_result = on_connect()
            print(actual_result)
            expected_result = test[KEY_EXPECTED]
            print(expected_result)
            #self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result, expected_result)
            
class updateDisconnectTestCase(unittest.TestCase):
    #print("nothing to see")
    def setUp(self):
        #print('setup')
        self.success_test_params = [
            {
                KEY_INPUT: '',
                KEY_EXPECTED: 'User disconnected!',
            },
            
        ]
    def test_success2(self):
        #print("Testing")
        for test in self.success_test_params:
            print("buffer1")
            actual_result = on_disconnect()
            print("buffer2")
            print(actual_result)
            print("buffer3")
            expected_result = test[KEY_EXPECTED]
            print("buffer4")
            print(expected_result)
            print("buffer5")
            
            #self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result, expected_result)
if __name__ == '__main__':
    unittest.main()