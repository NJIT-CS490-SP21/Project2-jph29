'''
MOCKED UNIT TEST FOR SERVER-SIDE APPLICATION
    Each test should extend unittest.TestCase and use the mocking framework in Lecture 13
    Each test should test logic of 1 unique function in your app. None should make any real DB/Socket calls, but instead mock them
    Each test should have 3+ test cases and 2+ assert statements, and pass when ran
    https://docs.python.org/3/library/unittest.mock.html
    Hint: Mocking will probably be for any sort of DB-related logic. If you’re out of ideas, you can also mock Socket logic to see that events are emitted and received as expected. https://blog.miguelgrinberg.com/post/unit-testing-applications-that-use-flask-login-and-flask-socketio

'''
import unittest
import unittest.mock as mock
from unittest.mock import patch
import os 
import sys

sys.path.append(os.path.abspath('../../'))
from app import on_log
import models

KEY_INPUT = "jaymee"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = 'user1'

class AddUserTestCase(unittest.TestCase):
    def setup(self):
            self.success_test_params = [
                {
                    KEY_INPUT: 'jaymee',
                    KEY_EXPECTED: [INITIAL_USERNAME, 'jaymee'],
                },
            ]
            initial_person = models.Gamer(username=INITIAL_USERNAME, gameswon=0)
            self.initial_db_mock = [initial_person]
    
    def mocked_db_session_add(self, username):
        self.initial_db_mock.append(username)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_person_query_all(self):
        return self.initial_db_mock
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit',self.mocked_db_session_commit):
                    with patch('models.Gamer.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all
                        
                        print(self.initial_db_mock)
                        actual_result = on_log(test[KEY_INPUT])
                        print(actual_result)
                        expected_result = test[KEY_EXPECTED]
                        print(self.initial_db_mock)
                        print(expected_result)
                        
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result[1], expected_result[1])

if __name__ == '__main__':
    unittest.main()
            
            