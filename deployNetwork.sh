~/fabric-dev-servers/stopFabric.sh
~/fabric-dev-servers/teardownFabric.sh
~/fabric-dev-servers/startFabric.sh
composer card delete -c PeerAdmin@hlfv1
~/fabric-dev-servers/createPeerAdminCard.sh
composer archive create -t dir -n .
composer network install --card PeerAdmin@hlfv1 -a dbtnetwork@$1.bna 
composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --file networkadmin.card --networkName dbtnetwork --networkVersion $1
composer card delete -c admin@dbtnetwork
composer card import --file networkadmin.card
composer network ping --card admin@dbtnetwork





