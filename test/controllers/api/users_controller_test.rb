require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get username:string" do
    get api_users_username:string_url
    assert_response :success
  end

  test "should get discriminator:integer" do
    get api_users_discriminator:integer_url
    assert_response :success
  end

  test "should get email:string" do
    get api_users_email:string_url
    assert_response :success
  end

  test "should get password_digest:string" do
    get api_users_password_digest:string_url
    assert_response :success
  end

  test "should get session_token:string" do
    get api_users_session_token:string_url
    assert_response :success
  end

end
