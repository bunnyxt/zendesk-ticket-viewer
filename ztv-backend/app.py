import argparse
from flask import Flask, request
from flask_cors import CORS
from waitress import serve
import urllib3
import json

# create flask app
app = Flask(__name__, static_url_path='', static_folder='../ztv-frontend/dist')
CORS(app)

# these constant variables would be parsed from args
USER = 'user'
TOKEN = 'token'
DOMAIN = 'domain'

# create urllib3 pool manager
http = urllib3.PoolManager()


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')


# fetch all tickets, 25 per page
@app.route('/api/tickets')
def fetch_tickets():
    page = request.args.get('page') if request.args.get('page') else '1'
    url = 'https://%s.zendesk.com/api/v2/tickets.json?per_page=25&page=%s' % (DOMAIN, page)
    headers = urllib3.make_headers(basic_auth='%s/token:%s' % (USER, TOKEN))
    r = http.request('GET', url, headers=headers)
    if r.status != 200:
        return json.dumps({
            'status': 500,
            'message': 'Invalid status returned from API when fetching page %s tickets.' % page,
            'data': json.loads(r.data)
        }), 500
    return json.dumps({
        'status': 0,
        'message': 'Tickets fetched successfully.',
        'data': json.loads(r.data)
    })


# fetch ticket via ticket id
@app.route('/api/tickets/<ticket_id>')
def fetch_ticket_via_ticket_id(ticket_id):
    url = 'https://%s.zendesk.com/api/v2/tickets/%s.json' % (DOMAIN, ticket_id)
    headers = urllib3.make_headers(basic_auth='%s/token:%s' % (USER, TOKEN))
    r = http.request('GET', url, headers=headers)
    if r.status != 200:
        return json.dumps({
            'status': 500,
            'message': 'Invalid status returned from API when fetching ticket %s.' % ticket_id,
            'data': json.loads(r.data)
        }), 500
    return json.dumps({
        'status': 0,
        'message': 'Ticket fetched successfully.',
        'data': json.loads(r.data)
    })


if __name__ == "__main__":
    # parse args
    parser = argparse.ArgumentParser(description='Backend of Zendesk Ticket Viewer.')
    parser.add_argument('-u', '--user', dest='user', required=True,
                        help='the username of the account')
    parser.add_argument('-t', '--token', dest='token', required=True,
                        help='the token to access the account')
    parser.add_argument('-d', '--domain', dest='domain', required=True,
                        help='the sub domain of the account')
    parser.add_argument('-p', '--port', dest='port', default='1437',
                        help='the port number where the server start, default: 1437')

    args = parser.parse_args()
    USER = args.user
    TOKEN = args.token
    DOMAIN = args.domain
    
    # start server
    serve(app, host="0.0.0.0", port=args.port)
