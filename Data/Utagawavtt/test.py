import scrapy

class LoginSpider(scrapy.Spider):
    name = 'login'
    start_urls = ['https://www.utagawavtt.com/forum_v3/ucp.php?mode=login']

    def parse(self, response):
        return scrapy.FormRequest.from_response(
            response,
            formdata={'username': 'sport_test, 'password': 'sport_test'},
            callback=self.after_login
        )

    def after_login(self, response):
        # check login succeed before going on
        if "connexion" in response.body:
            self.logger.error("Login failed")
            return

        page = response.url.split("/")[-2]
        filename = 'quotes-%s.html' % page
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename)
