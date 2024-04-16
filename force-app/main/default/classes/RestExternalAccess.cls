public class RestExternalAccess {
    
    
    public static void TestRestExternalAccess(string userId) {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setHeader('Authorization','Bearer c6ee530f2400347185fc62c8cb3f7ec2a21eeaa7941714c7c3d1e4053c8d3430');
        /*req.setEndpoint('https://gorest.co.in/public/v2/users/' + userId);*/
        /*req.setMethod('GET');*/

        req.setHeader('Accept','application/json');
        req.setHeader('Content-Type','application/json');
        req.setEndpoint('https://gorest.co.in/public/v2/users');        
        req.setMethod('POST');
        string reqBody = '{"name":"Tenali Ramakrishna", "gender":"male", "email":"kalyn@15ce.com", "status":"active"}';

        HTTPResponse resp = http.send(req);
        System.debug('Response data -->' + resp.getStatusCode());
        System.debug('Response check -->' + resp.getbody());
    }

}