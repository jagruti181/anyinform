<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Site extends CI_Controller 
{
	public function __construct( )
	{
		parent::__construct();
		
		$this->is_logged_in();
	}
	function is_logged_in( )
	{
		$is_logged_in = $this->session->userdata( 'logged_in' );
		if ( $is_logged_in !== 'true' || !isset( $is_logged_in ) ) {
			redirect( base_url() . 'index.php/login', 'refresh' );
		} //$is_logged_in !== 'true' || !isset( $is_logged_in )
	}
	function checkaccess($access)
	{
		$accesslevel=$this->session->userdata('accesslevel');
		if(!in_array($accesslevel,$access))
			redirect( base_url() . 'index.php/site?alerterror=You do not have access to this page. ', 'refresh' );
	}
	public function index()
	{
		//$access = array("1","2");
		$access = array("1","2");
		$this->checkaccess($access);
		$data[ 'page' ] = 'dashboard';
		$data[ 'title' ] = 'Welcome';
		$this->load->view( 'template', $data );	
	}
	public function createuser()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['accesslevel']=$this->user_model->getaccesslevels();
		$data[ 'status' ] =$this->user_model->getstatusdropdown();
		$data[ 'page' ] = 'createuser';
		$data[ 'title' ] = 'Create User';
		$this->load->view( 'template', $data );	
	}
	function createusersubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('firstname','First Name','trim|required|max_length[30]');
		$this->form_validation->set_rules('lastname','Last Name','trim|max_length[30]');
		$this->form_validation->set_rules('password','Password','trim|required|min_length[6]|max_length[30]');
		$this->form_validation->set_rules('confirmpassword','Confirm Password','trim|required|matches[password]');
		$this->form_validation->set_rules('accessslevel','Accessslevel','trim');
		$this->form_validation->set_rules('status','status','trim|');
		$this->form_validation->set_rules('email','Email','trim|required|valid_email|is_unique[user.email]');
		$this->form_validation->set_rules('contact','contactno','trim');
		$this->form_validation->set_rules('phoneno','phoneno','trim');
//		$this->form_validation->set_rules('website','Website','trim|max_length[50]');
//		$this->form_validation->set_rules('description','Description','trim|');
		$this->form_validation->set_rules('address','Address','trim|');
		$this->form_validation->set_rules('city','City','trim|max_length[30]');
		$this->form_validation->set_rules('pincode','Pincode','trim|max_length[20]');
		$this->form_validation->set_rules('state','state','trim|max_length[20]');
		$this->form_validation->set_rules('country','country','trim|max_length[20]');
		$this->form_validation->set_rules('facebookuserid','facebookuserid','trim|max_length[20]');
		$this->form_validation->set_rules('google','google','trim|max_length[20]');
		$this->form_validation->set_rules('email','Email','trim|valid_email');
		$this->form_validation->set_rules('status','Status','trim');
		$this->form_validation->set_rules('dob','DOB','trim');
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'status' ] =$this->user_model->getstatusdropdown();
			$data['accesslevel']=$this->user_model->getaccesslevels();
			$data['page']='createuser';
			$data['title']='Create New User';
			$this->load->view('template',$data);
		}
		else
		{
            $website=$this->input->post('website');
            $dob=$this->input->post('dob');
            $description=$this->input->post('description');
            $address=$this->input->post('address');
            $city=$this->input->post('city');
            $pincode=$this->input->post('pincode');
			$password=$this->input->post('password');
			if($dob != "")
			{
				$dob = date("Y-m-d",strtotime($dob));
			}
			$accesslevel=$this->input->post('accesslevel');
			$email=$this->input->post('email');
			$contact=$this->input->post('contact');
			$phoneno=$this->input->post('phoneno');
			$google=$this->input->post('google');
			$state=$this->input->post('state');
			$country=$this->input->post('country');
			$status=$this->input->post('status');
			$facebookuserid=$this->input->post('facebookuserid');
			$firstname=$this->input->post('firstname');
			$lastname=$this->input->post('lastname');
			if($this->user_model->create($firstname,$lastname,$dob,$password,$accesslevel,$email,$contact,$status,$facebookuserid,$website,$description,$address,$city,$pincode,$phoneno,$google,$state,$country)==0)
			$data['alerterror']="New user could not be created.";
			else
			$data['alertsuccess']="User created Successfully.";
			
			$data['table']=$this->user_model->viewusers();
			$data['redirect']="site/viewusers";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
		}
	}
	function viewusers()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->user_model->viewusers();
		$data['page']='viewusers';
		$data['title']='View Users';
		$this->load->view('template',$data);
	}
    
	function edituser()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'status' ] =$this->user_model->getstatusdropdown();
		$data['accesslevel']=$this->user_model->getaccesslevels();
		$data['before']=$this->user_model->beforeedit($this->input->get('id'));
		$data['page']='edituser';
		$data['page2']='block/userblock';
		$data['title']='Edit User';
		$this->load->view('template',$data);
	}
	function editusersubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('password','Password','trim|min_length[6]|max_length[30]');
		$this->form_validation->set_rules('confirmpassword','Confirm Password','trim|matches[password]');
		$this->form_validation->set_rules('accessslevel','Accessslevel','trim');
		$this->form_validation->set_rules('status','status','trim|');
		$this->form_validation->set_rules('email','Email','trim|required|valid_email|is_unique[user.email]');
		$this->form_validation->set_rules('contact','contactno','trim');
		$this->form_validation->set_rules('phoneno','phoneno','trim');
		$this->form_validation->set_rules('google','google','trim');
		$this->form_validation->set_rules('state','state','trim');
		$this->form_validation->set_rules('country','country','trim');
		$this->form_validation->set_rules('website','Website','trim|max_length[50]');
//		$this->form_validation->set_rules('description','Description','trim|');
		$this->form_validation->set_rules('address','Address','trim|');
		$this->form_validation->set_rules('city','City','trim|max_length[30]');
		$this->form_validation->set_rules('pincode','Pincode','trim|max_length[20]');
        
		$this->form_validation->set_rules('fname','First Name','trim|required|max_length[30]');
		$this->form_validation->set_rules('lname','Last Name','trim|max_length[30]');
		$this->form_validation->set_rules('email','Email','trim|valid_email');
		$this->form_validation->set_rules('status','Status','trim');
		$this->form_validation->set_rules('dob','DOB','trim');
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'status' ] =$this->user_model->getstatusdropdown();
			$data['accesslevel']=$this->user_model->getaccesslevels();
			$data['before']=$this->user_model->beforeedit($this->input->post('id'));
			$data['page']='edituser';
			$data['page2']='block/userblock';
			$data['title']='Edit User';
			$this->load->view('template',$data);
		}
		else
		{
            $website=$this->input->post('website');
            $description=$this->input->post('description');
            $address=$this->input->post('address');
            $city=$this->input->post('city');
            $pincode=$this->input->post('pincode');
			$id=$this->input->post('id');
			$password=$this->input->post('password');
			$dob=$this->input->post('dob');
			if($dob != "")
			{
				$dob = date("Y-m-d",strtotime($dob));
			}
			$accesslevel=$this->input->post('accesslevel');
			$contact=$this->input->post('contact');
			$phoneno=$this->input->post('phoneno');
			$google=$this->input->post('google');
			$state=$this->input->post('state');
			$country=$this->input->post('country');
			$status=$this->input->post('status');
			$facebookuserid=$this->input->post('facebookuserid');
			$fname=$this->input->post('fname');
			$lname=$this->input->post('lname');
			if($this->user_model->edit($id,$fname,$lname,$dob,$password,$accesslevel,$contact,$status,$facebookuserid,$website,$description,$address,$city,$pincode,$phoneno,$google,$state,$country)==0)
			$data['alerterror']="User Editing was unsuccesful";
			else
			$data['alertsuccess']="User edited Successfully.";
			
			$data['redirect']="site/viewusers";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			
		}
	}
	
	function deleteuser()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->user_model->deleteuser($this->input->get('id'));
		$data['table']=$this->user_model->viewusers();
		$data['alertsuccess']="User Deleted Successfully";
		$data['page']='viewusers';
		$data['title']='View Users';
		$this->load->view('template',$data);
	}
	function changeuserstatus()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->user_model->changestatus($this->input->get('id'));
		$data['table']=$this->user_model->viewusers();
		$data['alertsuccess']="Status Changed Successfully";
		$data['redirect']="site/viewusers";
        $data['other']="template=$template";
        $this->load->view("redirect",$data);
	}
    
    
    
    /*-----------------User/Organizer Finctions added by avinash for frontend APIs---------------*/
    public function update()
	{
        $id=$this->input->get('id');
        $firstname=$this->input->get('firstname');
        $lastname=$this->input->get('lastname');
        $password=$this->input->get('password');
        $password=md5($password);
        $email=$this->input->get('email');
        $website=$this->input->get('website');
        $description=$this->input->get('description');
        $eventinfo=$this->input->get('eventinfo');
        $contact=$this->input->get('contact');
        $address=$this->input->get('address');
        $city=$this->input->get('city');
        $pincode=$this->input->get('pincode');
        $dob=$this->input->get('dob');
       // $accesslevel=$this->input->get('accesslevel');
        $accesslevel=2;
        $timestamp=$this->input->get('timestamp');
        $facebookuserid=$this->input->get('facebookuserid');
        $newsletterstatus=$this->input->get('newsletterstatus');
        $status=$this->input->get('status');
        $logo=$this->input->get('logo');
        $showwebsite=$this->input->get('showwebsite');
        $eventsheld=$this->input->get('eventsheld');
        $topeventlocation=$this->input->get('topeventlocation');
        $data['json']=$this->user_model->update($id,$firstname,$lastname,$password,$email,$website,$description,$eventinfo,$contact,$address,$city,$pincode,$dob,$accesslevel,$timestamp,$facebookuserid,$newsletterstatus,$status,$logo,$showwebsite,$eventsheld,$topeventlocation);
        print_r($data);
		//$this->load->view('json',$data);
	}
	public function finduser()
	{
        $data['json']=$this->user_model->viewall();
        print_r($data);
		//$this->load->view('json',$data);
	}
    public function findoneuser()
	{
        $id=$this->input->get('id');
        $data['json']=$this->user_model->viewone($id);
        print_r($data);
		//$this->load->view('json',$data);
	}
    public function deleteoneuser()
	{
        $id=$this->input->get('id');
        $data['json']=$this->user_model->deleteone($id);
		//$this->load->view('json',$data);
	}
    public function login()
    {
        $email=$this->input->get("email");
        $password=$this->input->get("password");
        $data['json']=$this->user_model->login($email,$password);
        //$this->load->view('json',$data);
    }
    public function authenticate()
    {
        $data['json']=$this->user_model->authenticate();
        //$this->load->view('json',$data);
    }
    public function signup()
    {
        $email=$this->input->get_post("email");
        $password=$this->input->get_post("password");
        $data['json']=$this->user_model->signup($email,$password);
        //$this->load->view('json',$data);
        
    }
    public function logout()
    {
        $this->session->sess_destroy();
        $data['json']=true;
        //$this->load->view('json',$data);
    }
    
    
    
    /*-----------------End of User/Organizer functions----------------------------------*/
    
    
    
	//category
    
	function viewcategory()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->category_model->viewcategory();
		$data['page']='viewcategory';
		$data['title']='View category';
		$this->load->view('template',$data);
	}
	function viewsubcategory()
	{
		$access = array("1");
		$this->checkaccess($access);
		//$data['table']=$this->category_model->viewsubcategory();
        $brandid=$this->input->get('brandid');
        $categoryid=$this->input->get('id');
        $data['check']=$this->category_model->selectedcategory($brandid,$categoryid);
        $data['brandcategoryid']=$this->category_model->getbrandcategoryid($brandid,$categoryid);
		$data['page']='viewsubcategory';
		$data['title']='View Sub-category';
		$this->load->view('template',$data);
	}
     function editsubcategorysubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('brandcategoryid','brandcategoryid','trim|required');
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$brandid=$this->input->get('brandid');
        $categoryid=$this->input->get('id');
        $data['check']=$this->category_model->selectedcategory($brandid,$categoryid);
        $data['brandcategoryid']=$this->category_model->getbrandcategoryid($brandid,$categoryid);
		$data['page']='viewsubcategory';
		$data['title']='View Sub-category';
		$this->load->view('template',$data);
		}
		else
		{
			$brandcategoryid=$this->input->post('brandcategoryid');
			$men=$this->input->post('men');
			$women=$this->input->post('women');
			$kids=$this->input->post('kids');
            echo "men=".$men;
            if($men=="1")
               {
                $this->category_model->editsubcategorysubmit($brandcategoryid,$men);
                
               }
               else
               {
                   echo "else";
               $this->category_model->deletesubcategorysubmit($brandcategoryid,1);
               }
               
            if($women=="2")
               {
                $this->category_model->editsubcategorysubmit($brandcategoryid,$women);
               }
               else
               {
               $this->category_model->deletesubcategorysubmit($brandcategoryid,2);
               }
            if($kids=="3")
               {
                $this->category_model->editsubcategorysubmit($brandcategoryid,$kids);
               }
               else
               {
               $this->category_model->deletesubcategorysubmit($brandcategoryid,3);
               }
			$brandid=$this->input->get('brandid');
        $categoryid=$this->input->get('id');
        $data['check']=$this->category_model->selectedcategory($brandid,$categoryid);
        $data['brandcategoryid']=$this->category_model->getbrandcategoryid($brandid,$categoryid);
		$data['page']='viewsubcategory';
		$data['title']='View Sub-category';
		$this->load->view('template',$data);
			//$data['other']="template=$template";
			//$this->load->view("redirect",$data);
			/*$data['page']='viewusers';
			$data['title']='View Users';
			$this->load->view('template',$data);*/
		}
	}
	public function createcategory()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'status' ] =$this->category_model->getstatusdropdown();
		$data['category']=$this->category_model->getcategorydropdown();
		$data[ 'page' ] = 'createcategory';
		$data[ 'title' ] = 'Create category';
		$this->load->view( 'template', $data );	
	}
   
	function createcategorysubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
		$this->form_validation->set_rules('parent','parent','trim|');
		$this->form_validation->set_rules('status','status','trim|');
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'status' ] =$this->category_model->getstatusdropdown();
			$data['category']=$this->category_model->getcategorydropdown();
			$data[ 'page' ] = 'createcategory';
			$data[ 'title' ] = 'Create category';
			$this->load->view('template',$data);
		}
		else
		{
			$name=$this->input->post('name');
			$parent=$this->input->post('parent');
			$status=$this->input->post('status');
			if($this->category_model->createcategory($name,$parent,$status)==0)
			$data['alerterror']="New category could not be created.";
			else
			$data['alertsuccess']="category  created Successfully.";
			$data['table']=$this->category_model->viewcategory();
			$data['redirect']="site/viewcategory";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
		}
	}
    
	function editcategory()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['before']=$this->category_model->beforeeditcategory($this->input->get('id'));
		$data['category']=$this->category_model->getcategorydropdown();
		$data[ 'status' ] =$this->category_model->getstatusdropdown();
		$data['page']='editcategory';
		$data['title']='Edit category';
		$this->load->view('template',$data);
	}
	function editcategorysubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
		$this->form_validation->set_rules('parent','parent','trim|');
		$this->form_validation->set_rules('status','status','trim|');
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'status' ] =$this->category_model->getstatusdropdown();
			$data['category']=$this->category_model->getcategorydropdown();
			$data['before']=$this->category_model->beforeeditcategory($this->input->post('id'));
			$data['page']='editcategory';
			$data['title']='Edit category';
			$this->load->view('template',$data);
		}
		else
		{
			$id=$this->input->post('id');
			$name=$this->input->post('name');
			$parent=$this->input->post('parent');
			$status=$this->input->post('status');
			
			if($this->category_model->editcategory($id,$name,$parent,$status)==0)
			$data['alerterror']="category Editing was unsuccesful";
			else
			$data['alertsuccess']="category edited Successfully.";
			$data['table']=$this->category_model->viewcategory();
			$data['redirect']="site/viewcategory";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			/*$data['page']='viewusers';
			$data['title']='View Users';
			$this->load->view('template',$data);*/
		}
	}
   
	function deletecategory()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->category_model->deletecategory($this->input->get('id'));
		$data['table']=$this->category_model->viewcategory();
		$data['alertsuccess']="category Deleted Successfully";
		$data['page']='viewcategory';
		$data['title']='View category';
		$this->load->view('template',$data);
	}
	
	
    
	//City
    
    function viewcity()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->city_model->viewcity();
		$data['page']='viewcity';
		$data['title']='View City';
		$this->load->view('template',$data);
	} 
    function viewonecitylocations()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->city_model->viewonecitylocations($this->input->get('cityid'));
		$data['page']='viewonecitylocations';
		$data['title']='View Locations';
		$this->load->view('template',$data);
	}
	public function createcity()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'page' ] = 'createcity';
		$data[ 'title' ] = 'Create city';
//		$data['location']=$this->location_model->getlocation();
//        $data['category']=$this->category_model->getcategory();
//        $data['topic']=$this->topic_model->gettopic();
//		$data['listingtype']=$this->event_model->getlistingtype();
//		$data['remainingticket']=$this->event_model->getremainingticket();
		$this->load->view( 'template', $data );	
	}
    function createcitysubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data['page']='createcity';
			$data['title']='Create New City';
//			$data['organizer']=$this->organizer_model->getorganizer();
//			$data['listingtype']=$this->event_model->getlistingtype();
//			$data['remainingticket']=$this->event_model->getremainingticket();
			$this->load->view('template',$data);
		}
		else
		{
			$name=$this->input->post('name');
			if($this->city_model->create($name)==0)
			$data['alerterror']="New City could not be created.";
			else
			$data['alertsuccess']="City created Successfully.";
			
			$data['table']=$this->city_model->viewcity();
			$data['redirect']="site/viewcity";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
		}
	}
    public function createlocation()
	{
		$access = array("1");
		$this->checkaccess($access);
        $data['cityid']=$this->input->get('cityid');
		$data[ 'page' ] = 'createlocation';
		$data[ 'title' ] = 'Create Location';
//		$data['location']=$this->location_model->getlocation();
//        $data['category']=$this->category_model->getcategory();
//        $data['topic']=$this->topic_model->gettopic();
//		$data['listingtype']=$this->event_model->getlistingtype();
//		$data['remainingticket']=$this->event_model->getremainingticket();
		$this->load->view( 'template', $data );	
	}
    function createlocationsubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
		$this->form_validation->set_rules('pincode','Pincode','trim|required');
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data['page']='createlocation';
			$data['title']='Create New Location';
//			$data['organizer']=$this->organizer_model->getorganizer();
//			$data['listingtype']=$this->event_model->getlistingtype();
//			$data['remainingticket']=$this->event_model->getremainingticket();
			$this->load->view('template',$data);
		}
		else
		{
			$name=$this->input->post('name');
			$pincode=$this->input->post('pincode');
			$cityid=$this->input->get_post('cityid');
			if($this->city_model->createlocation($name,$cityid,$pincode)==0)
			$data['alerterror']="New Location could not be created.";
			else
			$data['alertsuccess']="Location created Successfully.";
			
			$data['table']=$this->city_model->viewonecitylocations($cityid);
			$data['redirect']="site/viewonecitylocations?cityid=".$cityid;
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
		}
	}
    
    function editcity()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['before']=$this->city_model->beforeedit($this->input->get('id'));
//		$data['organizer']=$this->organizer_model->getorganizer();
//		$data['listingtype']=$this->event_model->getlistingtype();
//		$data['remainingticket']=$this->event_model->getremainingticket();
//		$data['page2']='block/eventblock';
		$data['page']='editcity';
		$data['title']='Edit City';
		$this->load->view('template',$data);
	}
	function editcitysubmit()
	{
		$access = array("1","2");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
//			$data['organizer']=$this->organizer_model->getorganizer();
//			$data['listingtype']=$this->event_model->getlistingtype();
//			$data['remainingticket']=$this->event_model->getremainingticket();
			$data['before']=$this->city_model->beforeedit($this->input->post('id'));
//			$data['page2']='block/eventblock';
			$data['page']='editcity';
			$data['title']='Edit City';
			$this->load->view('template',$data);
		}
		else
		{
			$id=$this->input->post('id');
			$name=$this->input->post('name');
			if($this->city_model->edit($id,$name)==0)
			$data['alerterror']="City Editing was unsuccesful";
			else
			$data['alertsuccess']="City edited Successfully.";
			
			$data['redirect']="site/viewcity";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			
		}
	}
	function editlocation()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['before']=$this->city_model->beforeeditlocation($this->input->get('id'));
//		$data['organizer']=$this->organizer_model->getorganizer();
//		$data['listingtype']=$this->event_model->getlistingtype();
//		$data['remainingticket']=$this->event_model->getremainingticket();
//		$data['page2']='block/eventblock';
		$data['page']='editlocation';
		$data['title']='Edit Location';
		$this->load->view('template',$data);
	}
	function editlocationsubmit()
	{
		$access = array("1","2");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
		$this->form_validation->set_rules('pincode','Pincode','trim|required');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
//			$data['organizer']=$this->organizer_model->getorganizer();
//			$data['listingtype']=$this->event_model->getlistingtype();
//			$data['remainingticket']=$this->event_model->getremainingticket();
			$data['before']=$this->city_model->beforeedit($this->input->post('id'));
//			$data['page2']='block/eventblock';
			$data['page']='editcity';
			$data['title']='Edit City';
			$this->load->view('template',$data);
		}
		else
		{
			$id=$this->input->get_post('id');
			$cityid=$this->input->get_post('cityid');
			$name=$this->input->post('name');
			$pincode=$this->input->post('pincode');
			if($this->city_model->editlocation($id,$cityid,$name,$pincode)==0)
			$data['alerterror']="Location Editing was unsuccesful";
			else
			$data['alertsuccess']="Location edited Successfully.";
			
			$data['redirect']="site/viewonecitylocations?cityid=".$cityid;
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			
		}
	}
	
    
	function deletecity()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->city_model->deletecity($this->input->get('id'));
		$data['table']=$this->city_model->viewcity();
		$data['alertsuccess']="City Deleted Successfully";
		$data['page']='viewcity';
		$data['title']='View City';
		$this->load->view('template',$data);
	}
     
	function deletelocation()
	{
		$access = array("1");
		$this->checkaccess($access);
        $cityid=$this->input->get('cityid');
		$this->city_model->deletelocation($this->input->get('id'));
		$data['table']=$this->city_model->viewonecitylocations($cityid);
		$data['alertsuccess']="City Deleted Successfully";
		$data['page']='viewonecitylocations';
		$data['title']='View Location';
		$this->load->view('template',$data);
	}
    
  //listing
    
   
	function viewlisting()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->listing_model->viewlisting();
		$data['page']='viewlisting';
		$data['title']='View listing';
		$this->load->view('template',$data);
	}
    
	public function createlisting()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['accesslevel']=$this->listing_model->getaccesslevels();
		$data[ 'type' ] =$this->listing_model->gettypedropdown();
		$data[ 'isverified' ] =$this->listing_model->getisverifieddropdown();
		$data[ 'user' ] =$this->listing_model->getuserdropdown();
        $data[ 'city' ] =$this->city_model->getcitydropdown();
        $data[ 'category' ] =$this->category_model->getcategoryforlistingdropdown();
        $data[ 'modeofpayment' ] =$this->modeofpayment_model->getmodeofpaymentforlistingdropdown();
        $data[ 'daysofoperation' ] =$this->modeofpayment_model->getdaysofoperationforlistingdropdown();
		$data[ 'page' ] = 'createlisting';
		$data[ 'title' ] = 'Create listing';
		$this->load->view( 'template', $data );	
	}
    
	function createlistingsubmit()
	{
//        print_r($_POST);
        
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required|max_length[30]');
		$this->form_validation->set_rules('user','User','trim');
		$this->form_validation->set_rules('lat','latitude','trim');
		$this->form_validation->set_rules('long','longitude','trim');
		$this->form_validation->set_rules('address','Address','trim|');
		$this->form_validation->set_rules('city','City','trim|max_length[30]');
		$this->form_validation->set_rules('pincode','Pincode','trim|max_length[20]');
		$this->form_validation->set_rules('state','state','trim|max_length[20]');
		$this->form_validation->set_rules('country','country','trim|max_length[20]');
        $this->form_validation->set_rules('description','Description','trim|');
		$this->form_validation->set_rules('contact','contactno','trim');
		$this->form_validation->set_rules('email','Email','trim|required|valid_email');
        $this->form_validation->set_rules('website','Website','trim');
		$this->form_validation->set_rules('facebookuserid','facebookuserid','trim');
		$this->form_validation->set_rules('googleplus','googleplus','trim');
		$this->form_validation->set_rules('twitter','twitter','trim');
		$this->form_validation->set_rules('yearofestablishment','yearofestablishment','trim');
		$this->form_validation->set_rules('timeofoperation_start','timeofoperation_start','trim');
		$this->form_validation->set_rules('timeofoperation_end','timeofoperation_end','trim');
		$this->form_validation->set_rules('type','type','trim');
		$this->form_validation->set_rules('credits','credits','trim');
		$this->form_validation->set_rules('isverified','isverified','trim');
		$this->form_validation->set_rules('video','video','trim');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data['accesslevel']=$this->listing_model->getaccesslevels();
            $data[ 'type' ] =$this->listing_model->gettypedropdown();
            $data[ 'isverified' ] =$this->listing_model->getisverifieddropdown();
            $data[ 'user' ] =$this->listing_model->getuserdropdown();
            $data[ 'city' ] =$this->city_model->getcitydropdown();
            $data[ 'category' ] =$this->category_model->getcategoryforlistingdropdown();
            $data[ 'modeofpayment' ] =$this->modeofpayment_model->getmodeofpaymentforlistingdropdown();
            $data[ 'daysofoperation' ] =$this->modeofpayment_model->getdaysofoperationforlistingdropdown();
            $data[ 'page' ] = 'createlisting';
            $data[ 'title' ] = 'Create listing';
            $this->load->view( 'template', $data );	
		}
		else
		{
            $name=$this->input->post('name');
			$user=$this->input->post('user');
			$lat=$this->input->post('lat');
			$long=$this->input->post('long');
            $address=$this->input->post('address');
            $city=$this->input->post('city');
            $pincode=$this->input->post('pincode');
            $state=$this->input->post('state');
			$country=$this->input->post('country');
            $description=$this->input->post('description');
			$contact=$this->input->post('contact');
			$email=$this->input->post('email');
            $website=$this->input->post('website');
			$facebookuserid=$this->input->post('facebookuserid');
			$googleplus=$this->input->post('googleplus');
			$twitter=$this->input->post('twitter');
			$yearofestablishment=$this->input->post('yearofestablishment');
			$timeofoperation_start=$this->input->post('timeofoperation_start');
			$timeofoperation_end=$this->input->post('timeofoperation_end');
			$type=$this->input->post('type');
			$credits=$this->input->post('credits');
			$isverified=$this->input->post('isverified');
			$video=$this->input->post('video');
            
            $category=$this->input->post('category');
            $modeofpayment=$this->input->post('modeofpayment');
            $daysofoperation=$this->input->post('daysofoperation');
            
            $config['upload_path'] = './uploads/';
			$config['allowed_types'] = 'gif|jpg|png|jpeg';
			$this->load->library('upload', $config);
			$filename="logo";
			$logo="";
			if (  $this->upload->do_upload($filename))
			{
				$uploaddata = $this->upload->data();
				$logo=$uploaddata['file_name'];
			}
            
			if($this->listing_model->create($name,$user,$lat,$long,$address,$city,$pincode,$state,$country,$description,$contact,$email,$website,$facebookuserid,$googleplus,$twitter,$yearofestablishment,$timeofoperation_start,$timeofoperation_end,$type,$credits,$isverified,$video,$logo,$category,$modeofpayment,$daysofoperation)==0)
			$data['alerterror']="New listing could not be created.";
			else
			$data['alertsuccess']="listing created Successfully.";
			
			$data['table']=$this->listing_model->viewlisting();
			$data['redirect']="site/viewlisting";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
		}
	}
    
	function editlisting()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'type' ] =$this->listing_model->gettypedropdown();
        $data[ 'isverified' ] =$this->listing_model->getisverifieddropdown();
        $data[ 'user' ] =$this->listing_model->getuserdropdown();
        $data[ 'city' ] =$this->city_model->getcitydropdown();
		$data['before']=$this->listing_model->beforeedit($this->input->get('id'));
        $data[ 'category' ] =$this->category_model->getcategoryforlistingdropdown();
        $data[ 'selectedcategory' ] =$this->category_model->getselectedcategoryforlistingdropdown($this->input->get('id'));
        $data[ 'modeofpayment' ] =$this->modeofpayment_model->getmodeofpaymentforlistingdropdown();
        $data[ 'selectedmodeofpayment' ] =$this->modeofpayment_model->getselectedmodeofpaymentforlistingdropdown($this->input->get('id'));
        $data[ 'daysofoperation' ] =$this->modeofpayment_model->getdaysofoperationforlistingdropdown();
        $data[ 'selecteddaysofoperation' ] =$this->modeofpayment_model->getselecteddaysofoperationforlistingdropdown($this->input->get('id'));
		$data['page']='editlisting';
		$data['page2']='block/listingblock';
		$data['title']='Edit listing';
		$this->load->view('templatewith2',$data);
	}
       
	function editlistingsubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required|max_length[30]');
		$this->form_validation->set_rules('user','User','trim');
		$this->form_validation->set_rules('lat','latitude','trim');
		$this->form_validation->set_rules('long','longitude','trim');
		$this->form_validation->set_rules('address','Address','trim|');
		$this->form_validation->set_rules('city','City','trim|max_length[30]');
		$this->form_validation->set_rules('pincode','Pincode','trim|max_length[20]');
		$this->form_validation->set_rules('state','state','trim|max_length[20]');
		$this->form_validation->set_rules('country','country','trim|max_length[20]');
        $this->form_validation->set_rules('description','Description','trim|');
		$this->form_validation->set_rules('contact','contactno','trim');
		$this->form_validation->set_rules('email','Email','trim|required|valid_email');
        $this->form_validation->set_rules('website','Website','trim');
		$this->form_validation->set_rules('facebookuserid','facebookuserid','trim');
		$this->form_validation->set_rules('googleplus','googleplus','trim');
		$this->form_validation->set_rules('twitter','twitter','trim');
		$this->form_validation->set_rules('yearofestablishment','yearofestablishment','trim');
		$this->form_validation->set_rules('timeofoperation_start','timeofoperation_start','trim');
		$this->form_validation->set_rules('timeofoperation_end','timeofoperation_end','trim');
		$this->form_validation->set_rules('type','type','trim');
		$this->form_validation->set_rules('credits','credits','trim');
		$this->form_validation->set_rules('isverified','isverified','trim');
		$this->form_validation->set_rules('video','video','trim');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'status' ] =$this->user_model->getstatusdropdown();
			$data[ 'type' ] =$this->listing_model->gettypedropdown();
            $data[ 'isverified' ] =$this->listing_model->getisverifieddropdown();
            $data[ 'user' ] =$this->listing_model->getuserdropdown();
            $data[ 'city' ] =$this->city_model->getcitydropdown();
            $data['before']=$this->listing_model->beforeedit($this->input->get('id'));
            $data[ 'category' ] =$this->category_model->getcategoryforlistingdropdown();
            $data[ 'selectedcategory' ] =$this->category_model->getselectedcategoryforlistingdropdown($this->input->get('id'));
            $data[ 'modeofpayment' ] =$this->modeofpayment_model->getmodeofpaymentforlistingdropdown();
            $data[ 'selectedmodeofpayment' ] =$this->modeofpayment_model->getselectedmodeofpaymentforlistingdropdown($this->input->get('id'));
            $data[ 'daysofoperation' ] =$this->modeofpayment_model->getdaysofoperationforlistingdropdown();
            $data[ 'selecteddaysofoperation' ] =$this->modeofpayment_model->getselecteddaysofoperationforlistingdropdown($this->input->get('id'));
            $data['page']='editlisting';
            $data['title']='Edit listing';
            $this->load->view('template',$data);
		}
		else
		{
            $id=$this->input->post('id');
            $name=$this->input->post('name');
			$user=$this->input->post('user');
			$lat=$this->input->post('lat');
			$long=$this->input->post('long');
            $address=$this->input->post('address');
            $city=$this->input->post('city');
            $pincode=$this->input->post('pincode');
            $state=$this->input->post('state');
			$country=$this->input->post('country');
            $description=$this->input->post('description');
			$contact=$this->input->post('contact');
			$email=$this->input->post('email');
            $website=$this->input->post('website');
			$facebookuserid=$this->input->post('facebookuserid');
			$googleplus=$this->input->post('googleplus');
			$twitter=$this->input->post('twitter');
			$yearofestablishment=$this->input->post('yearofestablishment');
			$timeofoperation_start=$this->input->post('timeofoperation_start');
			$timeofoperation_end=$this->input->post('timeofoperation_end');
			$type=$this->input->post('type');
			$credits=$this->input->post('credits');
			$isverified=$this->input->post('isverified');
			$video=$this->input->post('video');
            
            $category=$this->input->post('category');
            $modeofpayment=$this->input->post('modeofpayment');
            $daysofoperation=$this->input->post('daysofoperation');
            
            $config['upload_path'] = './uploads/';
			$config['allowed_types'] = 'gif|jpg|png|jpeg';
			$this->load->library('upload', $config);
			$filename="logo";
			$logo="";
			if (  $this->upload->do_upload($filename))
			{
				$uploaddata = $this->upload->data();
				$logo=$uploaddata['file_name'];
			}
            if($logo=="")
            {
                $logo=$this->listing_model->getlogobylistingid($id);
                $logo=$logo->logo;
            }
            
			if($this->listing_model->edit($id,$name,$user,$lat,$long,$address,$city,$pincode,$state,$country,$description,$contact,$email,$website,$facebookuserid,$googleplus,$twitter,$yearofestablishment,$timeofoperation_start,$timeofoperation_end,$type,$credits,$isverified,$video,$logo,$category,$modeofpayment,$daysofoperation)==0)
			$data['alerterror']="listing Editing was unsuccesful";
			else
			$data['alertsuccess']="listing edited Successfully.";
			
			$data['redirect']="site/viewlisting";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			
		}
	}
    
	function deletelisting()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->listing_model->deletelisting($this->input->get('id'));
		$data['table']=$this->listing_model->viewlisting();
		$data['alertsuccess']="listing Deleted Successfully";
		$data['page']='viewlisting';
		$data['title']='View listing';
		$this->load->view('template',$data);
	}
	
    //mode of payment
    
	function viewmodeofpayment()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->modeofpayment_model->viewmodeofpayment();
		$data['page']='viewmodeofpayment';
		$data['title']='View modeofpayment';
		$this->load->view('template',$data);
	}
    
	public function createmodeofpayment()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'page' ] = 'createmodeofpayment';
		$data[ 'title' ] = 'Create modeofpayment';
		$this->load->view( 'template', $data );	
	}
    
	function createmodeofpaymentsubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required|max_length[30]');
		
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'page' ] = 'createmodeofpayment';
            $data[ 'title' ] = 'Create modeofpayment';
            $this->load->view( 'template', $data );
		}
		else
		{
            $name=$this->input->post('name');
			
			if($this->modeofpayment_model->create($name)==0)
			$data['alerterror']="New Mode of payment could not be created.";
			else
			$data['alertsuccess']="modeofpayment created Successfully.";
			
			$data['table']=$this->modeofpayment_model->viewmodeofpayment();
			$data['redirect']="site/viewmodeofpayment";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
		}
	}
    
    function editmodeofpayment()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['before']=$this->modeofpayment_model->beforeedit($this->input->get('id'));
		$data['page']='editmodeofpayment';
		$data['title']='Edit modeofpayment';
		$this->load->view('template',$data);
	}
	function editmodeofpaymentsubmit()
	{
		$access = array("1","2");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data['before']=$this->modeofpayment_model->beforeedit($this->input->get('id'));
            $data['page']='editmodeofpayment';
            $data['title']='Edit modeofpayment';
            $this->load->view('template',$data);
		}
		else
		{
			$id=$this->input->post('id');
			$name=$this->input->post('name');
			if($this->modeofpayment_model->edit($id,$name)==0)
			$data['alerterror']="modeofpayment Editing was unsuccesful";
			else
			$data['alertsuccess']="modeofpayment edited Successfully.";
			
			$data['redirect']="site/viewmodeofpayment";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			
		}
	}
    
	function deletemodeofpayment()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->modeofpayment_model->deletemodeofpayment($this->input->get('id'));
		$data['table']=$this->modeofpayment_model->viewmodeofpayment();
		$data['alertsuccess']="modeofpayment Deleted Successfully";
		$data['page']='viewmodeofpayment';
		$data['title']='View modeofpayment';
		$this->load->view('template',$data);
	}
    
    
    //enquiry
    
	function viewenquiry()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->enquiry_model->viewenquiry();
		$data['page']='viewenquiry';
		$data['title']='View enquiry';
		$this->load->view('template',$data);
	}
    
	public function createenquiry()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'listing' ] =$this->listing_model->getlistingdropdown();
		$data[ 'page' ] = 'createenquiry';
		$data[ 'title' ] = 'Create enquiry';
		$this->load->view( 'template', $data );	
	}
    
	function createenquirysubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required|max_length[30]');
		$this->form_validation->set_rules('listing','listing','trim');
		$this->form_validation->set_rules('email','Email','trim|valid_email');
		$this->form_validation->set_rules('phone','phone','trim');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'listing' ] =$this->listing_model->getlistingdropdown();
            $data[ 'page' ] = 'createenquiry';
            $data[ 'title' ] = 'Create enquiry';
            $this->load->view( 'template', $data );		
		}
		else
		{
            $name=$this->input->post('name');
			$listing=$this->input->post('listing');
			$email=$this->input->post('email');
			$phone=$this->input->post('phone');
            
			if($this->enquiry_model->create($name,$listing,$email,$phone)==0)
			$data['alerterror']="New enquiry could not be created.";
			else
			$data['alertsuccess']="enquiry created Successfully.";
			
			$data['table']=$this->enquiry_model->viewenquiry();
			$data['redirect']="site/viewenquiry";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
		}
	}
    
    
	function editenquiry()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'listing' ] =$this->listing_model->getlistingdropdown();
		$data['before']=$this->enquiry_model->beforeedit($this->input->get('id'));
		$data['page']='editenquiry';
		$data['title']='Edit enquiry';
		$this->load->view('template',$data);
	}
       
	function editenquirysubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required|max_length[30]');
		$this->form_validation->set_rules('listing','listing','trim');
		$this->form_validation->set_rules('email','Email','trim|valid_email');
		$this->form_validation->set_rules('phone','phone','trim');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'listing' ] =$this->listing_model->getlistingdropdown();
            $data['before']=$this->enquiry_model->beforeedit($this->input->get('id'));
            $data['page']='editenquiry';
            $data['title']='Edit enquiry';
            $this->load->view('template',$data);
		}
		else
		{
            $id=$this->input->post('id');
            
            $name=$this->input->post('name');
			$listing=$this->input->post('listing');
			$email=$this->input->post('email');
			$phone=$this->input->post('phone');
            
			if($this->enquiry_model->edit($id,$name,$listing,$email,$phone)==0)
			$data['alerterror']="enquiry Editing was unsuccesful";
			else
			$data['alertsuccess']="enquiry edited Successfully.";
			
			$data['redirect']="site/viewenquiry";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			
		}
	}
    
	function deleteenquiry()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->enquiry_model->deleteenquiry($this->input->get('id'));
		$data['table']=$this->enquiry_model->viewenquiry();
		$data['alertsuccess']="enquiry Deleted Successfully";
		$data['page']='viewenquiry';
		$data['title']='View enquiry';
		$this->load->view('template',$data);
	}
    
    //specialoffers
    
	function viewspecialoffer()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->specialoffer_model->viewspecialoffer();
		$data['page']='viewspecialoffer';
		$data['title']='View specialoffer';
		$this->load->view('template',$data);
	}
    
	public function createspecialoffer()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'category' ] =$this->category_model->getcategorydropdown();
		$data[ 'listing' ] =$this->listing_model->getlistingforspecialofferdropdown();
		$data[ 'page' ] = 'createspecialoffer';
		$data[ 'title' ] = 'Create specialoffer';
		$this->load->view( 'template', $data );	
	}
    
	function createspecialoffersubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required|max_length[30]');
		$this->form_validation->set_rules('specialoffer','specialoffer','trim');
		$this->form_validation->set_rules('email','Email','trim|valid_email');
		$this->form_validation->set_rules('phone','phone','trim');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'listing' ] =$this->listing_model->getlistingdropdown();
            $data[ 'listing' ] =$this->listing_model->getlistingforspecialofferdropdown();
            $data[ 'page' ] = 'createspecialoffer';
            $data[ 'title' ] = 'Create specialoffer';
            $this->load->view( 'template', $data );		
		}
		else
		{
            $name=$this->input->post('name');
			$category=$this->input->post('category');
			$email=$this->input->post('email');
			$phone=$this->input->post('phone');
			$listing=$this->input->post('listing');
            
			if($this->specialoffer_model->create($name,$category,$email,$phone,$listing)==0)
			$data['alerterror']="New specialoffer could not be created.";
			else
			$data['alertsuccess']="specialoffer created Successfully.";
			
			$data['table']=$this->specialoffer_model->viewspecialoffer();
			$data['redirect']="site/viewspecialoffer";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
		}
	}
    
	function editspecialoffer()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'category' ] =$this->category_model->getcategorydropdown();
		$data[ 'listing' ] =$this->listing_model->getlistingforspecialofferdropdown();
		$data[ 'selectedlisting' ] =$this->specialoffer_model->getselectedlistingforspecialofferdropdown($this->input->get('id'));
		$data['before']=$this->specialoffer_model->beforeedit($this->input->get('id'));
		$data['page']='editspecialoffer';
		$data['title']='Edit specialoffer';
		$this->load->view('template',$data);
	}
       
	function editspecialoffersubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required|max_length[30]');
		$this->form_validation->set_rules('category','category','trim');
		$this->form_validation->set_rules('email','Email','trim|valid_email');
		$this->form_validation->set_rules('phone','phone','trim');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'category' ] =$this->category_model->getcategorydropdown();
            $data['before']=$this->specialoffer_model->beforeedit($this->input->get('id'));
            $data['page']='editspecialoffer';
            $data['title']='Edit specialoffer';
            $this->load->view('template',$data);
		}
		else
		{
            $id=$this->input->post('id');
            
            $name=$this->input->post('name');
			$category=$this->input->post('category');
			$email=$this->input->post('email');
			$phone=$this->input->post('phone');
			$listing=$this->input->post('listing');
            
			if($this->specialoffer_model->edit($id,$name,$category,$email,$phone,$listing)==0)
			$data['alerterror']="specialoffer Editing was unsuccesful";
			else
			$data['alertsuccess']="specialoffer edited Successfully.";
			
			$data['redirect']="site/viewspecialoffer";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			
		}
	}
    
	function deletespecialoffer()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->specialoffer_model->deletespecialoffer($this->input->get('id'));
		$data['table']=$this->specialoffer_model->viewspecialoffer();
		$data['alertsuccess']="specialoffer Deleted Successfully";
		$data['page']='viewspecialoffer';
		$data['title']='View specialoffer';
		$this->load->view('template',$data);
	}
    
    //paymenttype
    
	function viewpaymenttype()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->paymenttype_model->viewpaymenttype();
		$data['page']='viewpaymenttype';
		$data['title']='View paymenttype';
		$this->load->view('template',$data);
	}
    
	public function createpaymenttype()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'page' ] = 'createpaymenttype';
		$data[ 'title' ] = 'Create paymenttype';
		$this->load->view( 'template', $data );	
	}
    
	function createpaymenttypesubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required|max_length[30]');
		
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'page' ] = 'createpaymenttype';
            $data[ 'title' ] = 'Create paymenttype';
            $this->load->view( 'template', $data );
		}
		else
		{
            $name=$this->input->post('name');
			
			if($this->paymenttype_model->create($name)==0)
			$data['alerterror']="New Mode of payment could not be created.";
			else
			$data['alertsuccess']="paymenttype created Successfully.";
			
			$data['table']=$this->paymenttype_model->viewpaymenttype();
			$data['redirect']="site/viewpaymenttype";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
		}
	}
    
    function editpaymenttype()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['before']=$this->paymenttype_model->beforeedit($this->input->get('id'));
		$data['page']='editpaymenttype';
		$data['title']='Edit paymenttype';
		$this->load->view('template',$data);
	}
	function editpaymenttypesubmit()
	{
		$access = array("1","2");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data['before']=$this->paymenttype_model->beforeedit($this->input->get('id'));
            $data['page']='editpaymenttype';
            $data['title']='Edit paymenttype';
            $this->load->view('template',$data);
		}
		else
		{
			$id=$this->input->post('id');
			$name=$this->input->post('name');
			if($this->paymenttype_model->edit($id,$name)==0)
			$data['alerterror']="paymenttype Editing was unsuccesful";
			else
			$data['alertsuccess']="paymenttype edited Successfully.";
			
			$data['redirect']="site/viewpaymenttype";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			
		}
	}
    
	function deletepaymenttype()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->paymenttype_model->deletepaymenttype($this->input->get('id'));
		$data['table']=$this->paymenttype_model->viewpaymenttype();
		$data['alertsuccess']="paymenttype Deleted Successfully";
		$data['page']='viewpaymenttype';
		$data['title']='View paymenttype';
		$this->load->view('template',$data);
	}
    
    //billing
    
	function viewbilling()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->billing_model->viewbilling();
		$data['page']='viewbilling';
		$data['title']='View billing';
		$this->load->view('template',$data);
	}
    
	public function createbilling()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'paymenttype' ] =$this->paymenttype_model->getpaymenttypedropdown();
		$data[ 'period' ] =$this->paymenttype_model->getperioddropdown();
		$data[ 'user' ] =$this->listing_model->getuserdropdown();
		$data[ 'listing' ] =$this->listing_model->getlistingdropdown();
		$data[ 'page' ] = 'createbilling';
		$data[ 'title' ] = 'Create billing';
		$this->load->view( 'template', $data );	
	}
    
	function createbillingsubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('listing','Listing','trim');
		$this->form_validation->set_rules('user','User','trim');
		$this->form_validation->set_rules('paymenttype','paymenttype','trim|');
		$this->form_validation->set_rules('amount','amount','trim');
		$this->form_validation->set_rules('period','period','trim');
		$this->form_validation->set_rules('credits','credits','trim');
		$this->form_validation->set_rules('payedto','payedto','trim');
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'paymenttype' ] =$this->paymenttype_model->getpaymenttypedropdown();
            $data[ 'period' ] =$this->paymenttype_model->getperioddropdown();
            $data[ 'user' ] =$this->listing_model->getuserdropdown();
            $data[ 'listing' ] =$this->listing_model->getlistingdropdown();
            $data[ 'page' ] = 'createbilling';
            $data[ 'title' ] = 'Create billing';
            $this->load->view( 'template', $data );	
		}
		else
		{
            $listing=$this->input->post('listing');
			$user=$this->input->post('user');
			$paymenttype=$this->input->post('paymenttype');
			$amount=$this->input->post('amount');
            $period=$this->input->post('period');
            $credits=$this->input->post('credits');
            $payedto=$this->input->post('payedto');
            
			if($this->billing_model->create($listing,$user,$paymenttype,$amount,$period,$credits,$payedto)==0)
			$data['alerterror']="New billing could not be created.";
			else
			$data['alertsuccess']="billing created Successfully.";
			
			$data['table']=$this->billing_model->viewbilling();
			$data['redirect']="site/viewbilling";
			$this->load->view("redirect",$data);
		}
	}
    
	function editbilling()
	{
		$access = array("1");
		$this->checkaccess($access);
        $data[ 'paymenttype' ] =$this->paymenttype_model->getpaymenttypedropdown();
        $data[ 'period' ] =$this->paymenttype_model->getperioddropdown();
        $data[ 'user' ] =$this->listing_model->getuserdropdown();
        $data[ 'listing' ] =$this->listing_model->getlistingdropdown();
		$data['before']=$this->billing_model->beforeedit($this->input->get('id'));
		$data['page']='editbilling';
		$data['title']='Edit billing';
		$this->load->view('template',$data);
	}
       
	function editbillingsubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('listing','Listing','trim');
		$this->form_validation->set_rules('user','User','trim');
		$this->form_validation->set_rules('paymenttype','paymenttype','trim|');
		$this->form_validation->set_rules('amount','amount','trim');
		$this->form_validation->set_rules('period','period','trim');
		$this->form_validation->set_rules('credits','credits','trim');
		$this->form_validation->set_rules('payedto','payedto','trim');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'paymenttype' ] =$this->paymenttype_model->getpaymenttypedropdown();
            $data[ 'period' ] =$this->paymenttype_model->getperioddropdown();
            $data[ 'user' ] =$this->listing_model->getuserdropdown();
            $data[ 'listing' ] =$this->listing_model->getlistingdropdown();
            $data['before']=$this->billing_model->beforeedit($this->input->get('id'));
            $data['page']='editbilling';
            $data['title']='Edit billing';
            $this->load->view('template',$data);
		}
		else
		{
            $id=$this->input->post('id');
            $listing=$this->input->post('listing');
			$user=$this->input->post('user');
			$paymenttype=$this->input->post('paymenttype');
			$amount=$this->input->post('amount');
            $period=$this->input->post('period');
            $credits=$this->input->post('credits');
            $payedto=$this->input->post('payedto');
            
			if($this->billing_model->edit($id,$listing,$user,$paymenttype,$amount,$period,$credits,$payedto)==0)
			$data['alerterror']="billing Editing was unsuccesful";
			else
			$data['alertsuccess']="billing edited Successfully.";
			
			$data['redirect']="site/viewbilling";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			
		}
	}
    
	function deletebilling()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->billing_model->deletebilling($this->input->get('id'));
		$data['table']=$this->billing_model->viewbilling();
		$data['alertsuccess']="billing Deleted Successfully";
		$data['page']='viewbilling';
		$data['title']='View billing';
		$this->load->view('template',$data);
	}
    
    //position
    
	function viewposition()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->position_model->viewposition();
		$data['page']='viewposition';
		$data['title']='View position';
		$this->load->view('template',$data);
	}
    
	public function createposition()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data[ 'page' ] = 'createposition';
		$data[ 'title' ] = 'Create position';
		$this->load->view( 'template', $data );	
	}
    
	function createpositionsubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
		$this->form_validation->set_rules('height','height','trim');
		$this->form_validation->set_rules('width','width','trim');
		
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'page' ] = 'createposition';
            $data[ 'title' ] = 'Create position';
            $this->load->view( 'template', $data );
		}
		else
		{
            $name=$this->input->post('name');
            $height=$this->input->post('height');
            $width=$this->input->post('width');
			
			if($this->position_model->create($name,$height,$width)==0)
			$data['alerterror']="New Mode of payment could not be created.";
			else
			$data['alertsuccess']="position created Successfully.";
			
			$data['table']=$this->position_model->viewposition();
			$data['redirect']="site/viewposition";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
		}
	}
    
    function editposition()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['before']=$this->position_model->beforeedit($this->input->get('id'));
		$data['page']='editposition';
		$data['title']='Edit position';
		$this->load->view('template',$data);
	}
	function editpositionsubmit()
	{
		$access = array("1","2");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
		$this->form_validation->set_rules('height','height','trim');
		$this->form_validation->set_rules('width','width','trim');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data['before']=$this->position_model->beforeedit($this->input->get('id'));
            $data['page']='editposition';
            $data['title']='Edit position';
            $this->load->view('template',$data);
		}
		else
		{
			$id=$this->input->post('id');
			$name=$this->input->post('name');
            $height=$this->input->post('height');
            $width=$this->input->post('width');
			if($this->position_model->edit($id,$name,$height,$width)==0)
			$data['alerterror']="position Editing was unsuccesful";
			else
			$data['alertsuccess']="position edited Successfully.";
			
			$data['redirect']="site/viewposition";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			
		}
	}
    
	function deleteposition()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->position_model->deleteposition($this->input->get('id'));
		$data['table']=$this->position_model->viewposition();
		$data['alertsuccess']="position Deleted Successfully";
		$data['page']='viewposition';
		$data['title']='View position';
		$this->load->view('template',$data);
	}
    
    //add
    
	function viewadd()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->add_model->viewadd();
		$data['page']='viewadd';
		$data['title']='View add';
		$this->load->view('template',$data);
	}
    
	public function createadd()
	{
		$access = array("1");
		$this->checkaccess($access);
        $data[ 'position' ] =$this->position_model->getpositiondropdown();
		$data[ 'page' ] = 'createadd';
		$data[ 'title' ] = 'Create add';
		$this->load->view( 'template', $data );	
	}
    
	function createaddsubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
		$this->form_validation->set_rules('position','position','trim');
		$this->form_validation->set_rules('fromtimestamp','fromtimestamp','trim');
		$this->form_validation->set_rules('totimestamp','totimestamp','trim');
		$this->form_validation->set_rules('details','details','trim');
		
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'position' ] =$this->position_model->getpositiondropdown();
            $data[ 'page' ] = 'createadd';
            $data[ 'title' ] = 'Create add';
            $this->load->view( 'template', $data );	
		}
		else
		{
            $name=$this->input->post('name');
            $position=$this->input->post('position');
            $fromtimestamp=$this->input->post('fromtimestamp');
            $totimestamp=$this->input->post('totimestamp');
            $details=$this->input->post('details');
			$config['upload_path'] = './uploads/';
			$config['allowed_types'] = 'gif|jpg|png|jpeg';
			$this->load->library('upload', $config);
			$filename="image";
			$image="";
			if (  $this->upload->do_upload($filename))
			{
				$uploaddata = $this->upload->data();
				$image=$uploaddata['file_name'];
			}
			if($this->add_model->create($name,$position,$fromtimestamp,$totimestamp,$details,$image)==0)
			$data['alerterror']="New Add could not be created.";
			else
			$data['alertsuccess']="add created Successfully.";
			
			$data['table']=$this->add_model->viewadd();
			$data['redirect']="site/viewadd";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
		}
	}
    
    function editadd()
	{
		$access = array("1");
		$this->checkaccess($access);
        $data[ 'position' ] =$this->position_model->getpositiondropdown();
		$data['before']=$this->add_model->beforeedit($this->input->get('id'));
		$data['page']='editadd';
		$data['title']='Edit add';
		$this->load->view('template',$data);
	}
	function editaddsubmit()
	{
		$access = array("1","2");
		$this->checkaccess($access);
		$this->form_validation->set_rules('name','Name','trim|required');
		$this->form_validation->set_rules('position','position','trim');
		$this->form_validation->set_rules('fromtimestamp','fromtimestamp','trim');
		$this->form_validation->set_rules('totimestamp','totimestamp','trim');
		$this->form_validation->set_rules('details','details','trim');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data[ 'position' ] =$this->position_model->getpositiondropdown();
            $data['before']=$this->add_model->beforeedit($this->input->get('id'));
            $data['page']='editadd';
            $data['title']='Edit add';
            $this->load->view('template',$data);
		}
		else
		{
			$id=$this->input->post('id');
            $name=$this->input->post('name');
            $position=$this->input->post('position');
            $fromtimestamp=$this->input->post('fromtimestamp');
            $totimestamp=$this->input->post('totimestamp');
            $details=$this->input->post('details');
            $config['upload_path'] = './uploads/';
			$config['allowed_types'] = 'gif|jpg|png|jpeg';
			$this->load->library('upload', $config);
			$filename="image";
			$image="";
			if (  $this->upload->do_upload($filename))
			{
				$uploaddata = $this->upload->data();
				$image=$uploaddata['file_name'];
			}
            
            if($image=="")
            {
            $image=$this->add_model->getaddimagebyid($id);
               // print_r($image);
                $image=$image->image;
            }
			if($this->add_model->edit($id,$name,$position,$fromtimestamp,$totimestamp,$details,$image)==0)
			$data['alerterror']="add Editing was unsuccesful";
			else
			$data['alertsuccess']="add edited Successfully.";
			
			$data['redirect']="site/viewadd";
			//$data['other']="template=$template";
			$this->load->view("redirect",$data);
			
		}
	}
    
	function deleteadd()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->add_model->deleteadd($this->input->get('id'));
		$data['table']=$this->add_model->viewadd();
		$data['alertsuccess']="add Deleted Successfully";
		$data['page']='viewadd';
		$data['title']='View add';
		$this->load->view('template',$data);
	}
    
    //listingimages
    
	function viewlistingimages()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['table']=$this->listing_model->viewlistingimages($this->input->get('id'));
		$data['before']=$this->listing_model->beforeedit($this->input->get('id'));
		$data['page']='viewlistingimages';
		$data['page2']='block/listingblock';
		$data['title']='View listingimages';
		$this->load->view('templatewith2',$data);
	}
    
	public function createlistingimages()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['listing']=$this->input->get('id');
        $data['before']=$this->listing_model->beforeedit($this->input->get('id'));
//		$data['page']='viewlistingimages';
		$data[ 'page' ] = 'createlistingimages';
		$data['page2']='block/listingblock';
		$data[ 'title' ] = 'Create listingimage';
		$this->load->view( 'templatewith2', $data );	
	}
    
	function createlistingimagessubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('order','order','trim|required');
		
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$access = array("1");
            $this->checkaccess($access);
            $data['listing']=$this->input->get('id');
            $data[ 'page' ] = 'createlistingimages';
            $data[ 'title' ] = 'Create listingimage';
            $this->load->view( 'template', $data );		
		}
		else
		{
            $order=$this->input->post('order');
            $listing=$this->input->post('listing');
			$config['upload_path'] = './uploads/';
			$config['allowed_types'] = 'gif|jpg|png|jpeg';
			$this->load->library('upload', $config);
			$filename="image";
			$image="";
			if (  $this->upload->do_upload($filename))
			{
				$uploaddata = $this->upload->data();
				$image=$uploaddata['file_name'];
			}
			if($this->listing_model->createlistingimages($listing,$order,$image)==0)
			$data['alerterror']="New Image could not be created.";
			else
			$data['alertsuccess']="Image created Successfully.";
			
			$data['table']=$this->listing_model->viewlistingimages($listing);
            $data['redirect']="site/viewlistingimages?id=".$listing;
			$this->load->view("redirect",$data);
//            $data['page']='viewlistingimages';
//            $data['title']='View listingimages';
//            $this->load->view('template',$data);
		}
	}
    
	public function editlistingimages()
	{
		$access = array("1");
		$this->checkaccess($access);
		$data['listing']=$this->input->get('listingid');
        $data['before']=$this->listing_model->beforeedit($this->input->get('listingid'));
        $data['beforelistingimages']=$this->listing_model->beforeeditlistingimages($this->input->get('id'));
//		$data['page']='viewlistingimages';
		$data[ 'page' ] = 'editlistingimages';
		$data['page2']='block/listingblock';
		$data[ 'title' ] = 'Create listingimage';
		$this->load->view( 'templatewith2', $data );	
	}
    
	function editlistingimagessubmit()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->form_validation->set_rules('order','order','trim|required');
        
		if($this->form_validation->run() == FALSE)	
		{
			$data['alerterror'] = validation_errors();
			$data['listing']=$this->input->get('listingid');
            $data['before']=$this->listing_model->beforeedit($this->input->get('listingid'));
            $data['beforelistingimages']=$this->listing_model->beforeeditlistingimages($this->input->get('id'));
    //		$data['page']='viewlistingimages';
            $data[ 'page' ] = 'editlistingimages';
            $data['page2']='block/listingblock';
            $data[ 'title' ] = 'Create listingimage';
            $this->load->view( 'templatewith2', $data );
		}
		else
		{
			$id=$this->input->post('id');
//            echo $id;
            $order=$this->input->post('order');
            $listing=$this->input->post('listing');
//            echo $listing;
            
            $config['upload_path'] = './uploads/';
			$config['allowed_types'] = 'gif|jpg|png|jpeg';
			$this->load->library('upload', $config);
			$filename="image";
			$image="";
			if (  $this->upload->do_upload($filename))
			{
				$uploaddata = $this->upload->data();
				$image=$uploaddata['file_name'];
			}
            
            if($image=="")
            {
            $image=$this->listing_model->getlistingimagesbyid($id);
            $image=$image->image;
            }
//            echo $image;
			if($this->listing_model->editlistingimages($id,$order,$image,$listing)==0)
			$data['alerterror']="Image Editing was unsuccesful";
			else
			$data['alertsuccess']="Image edited Successfully.";
			
			$data['table']=$this->listing_model->viewlistingimages($listing);
            $data['redirect']="site/viewlistingimages?id=".$listing;
			$this->load->view("redirect",$data);
			
		}
	}
    
	function deletelistingimages()
	{
		$access = array("1");
		$this->checkaccess($access);
		$this->listing_model->deletelistingimages($this->input->get('id'));
        $listing=$this->input->get('listingid');
        $data['alerterror']="Image Deleted Successfully.";
		$data['table']=$this->listing_model->viewlistingimages($listing);
        $data['redirect']="site/viewlistingimages?id=".$listing;
        $this->load->view("redirect",$data);
	}
    
}
?>