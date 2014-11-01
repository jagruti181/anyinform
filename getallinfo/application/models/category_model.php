<?php
if ( !defined( 'BASEPATH' ) )
	exit( 'No direct script access allowed' );
class Category_model extends CI_Model
{
	//category
	public function createcategory($name,$parent,$status)
	{
		$data  = array(
			'name' => $name,
			'parent' => $parent,
			'status' => $status,
		);
		$query=$this->db->insert( 'category', $data );
		
		return  1;
	}
	public function createbrandcategory($brandid,$categoryid)
	{
		$data  = array(
			'brandid' => $brandid,
			'categoryid' => $categoryid
		);
		$query=$this->db->insert( 'brandcategory', $data );
		
		return  1;
	}
	function viewonebrandcategories($id)
	{
		$query=$this->db->query("SELECT `category`.`id`,`category`.`name`,`category`.`parent` as `parent`,`category`.`status` FROM `category`
        WHERE `category`.`id` IN(SELECT `brandcategory`.`categoryid` FROM `brandcategory` WHERE `brandcategory`.`brandid` IN(SELECT `brand`.`id` FROM `brand` WHERE `brand`.`id`='$id'))")->result();
		return $query;
	}
    function viewcategory()
	{
		$query=$this->db->query("SELECT `category`.`id`,`category`.`name`,`tab2`.`name` as `parent` FROM `category` 
		LEFT JOIN `category` as `tab2` ON `tab2`.`id`=`category`.`parent`
		ORDER BY `category`.`id` ASC")->result();
		return $query;
	}
    
	public function getstatusdropdown()
	{
		$status= array(
			 "1" => "Has Types",
			 "0" => "No Types",
			);
		return $status;
	}
    function viewmaincategory()
	{
		$query=$this->db->query("SELECT `category`.`id`,`category`.`name`,`category`.`status`,`tab2`.`name` as `parent` FROM `category` 
		LEFT JOIN `category` as `tab2` ON `tab2`.`id`=`category`.`parent` WHERE `category`.`parent`='0'
		ORDER BY `category`.`id` ASC")->result();
		return $query;
	}
    function viewallsubcategory()
	{
		$query=$this->db->query("SELECT `subcategory`.`id`,`subcategory`.`name` FROM `subcategory`")->result();
		return $query;
	}
    function viewcategorytypes()
	{
		$query=$this->db->query("SELECT `category`.`id`,`category`.`name`,`tab2`.`name` as `parent` FROM `category` 
		LEFT JOIN `category` as `tab2` ON `tab2`.`id`=`category`.`parent` WHERE `category`.`status`='0'
		ORDER BY `category`.`id` ASC")->result();
		return $query;
	}
    function viewsubcategory()
	{
		$query=$this->db->query("SELECT `categorysubcategory`.`categoryid`,`categorysubcategory`.`subcategoryid` FROM `categorysubcategory`
       ")->result();
		return $query;
	}
	public function beforeeditcategory( $id )
	{
		$this->db->where( 'id', $id );
		$query=$this->db->get( 'category' )->row();
		return $query;
	}
	
	public function editcategory( $id,$name,$parent,$status)
	{
		$data = array(
			'name' => $name,
			'parent' => $parent,
			'status' => $status,
		
		);
		$this->db->where( 'id', $id );
		$query=$this->db->update( 'category', $data );
		
		return 1;
	}
	function deletecategory($id)
	{
		$query=$this->db->query("DELETE FROM `category` WHERE `id`='$id'");
		
	}
	function deletebrandcategory($id,$brandid)
	{
		$query=$this->db->query("DELETE FROM `brandcategory` WHERE `categoryid`='$id' AND `brandid`='$brandid'");
		
	}
	public function getcategorydropdown()
	{
		$query=$this->db->query("SELECT * FROM `category`  ORDER BY `id` ASC")->result();
		$return=array(
		"" => ""
		);
		foreach($query as $row)
		{
			$return[$row->id]=$row->name;
		}
		
		return $return;
	}
	public function getcategoryforlistingdropdown()
	{
		$query=$this->db->query("SELECT * FROM `category`  ORDER BY `id` ASC")->result();
		$return=array(
		);
		foreach($query as $row)
		{
			$return[$row->id]=$row->name;
		}
		
		return $return;
	}
    
     public function getselectedcategoryforlistingdropdown($id)
	{
         $return=array();
		$query=$this->db->query("SELECT `listing`,`category` FROM `listingcategory`  WHERE `listing`='$id'");
        if($query->num_rows() > 0)
        {
            $query=$query->result();
            foreach($query as $row)
            {
                $return[]=$row->category;
            }
        }
         return $return;
	}
	public function getmaincategorydropdown()
	{
		$query=$this->db->query("SELECT * FROM `category` WHERE `parent`='0'  ORDER BY `id` ASC")->result();
		$return=array(
		"" => ""
		);
		foreach($query as $row)
		{
			$return[$row->id]=$row->name;
		}
		
		return $return;
	}
	public function getcategory()
	{
		$query=$this->db->query("SELECT * FROM `category`  ORDER BY `name` ASC")->result();
		
		
		return $query;
	}
//	public function getstatusdropdown()
//	{
//		$status= array(
//			 "1" => "Enabled",
//			 "0" => "Disabled",
//			);
//		return $status;
//	}
    public function selectedcategory($brandid,$categoryid)
    {
        $subcategory=array();
//        $query3=$this->db->query("SELECT `id` FROM `brandcategory` where `brandid`='$brandid' and `categoryid`='$categoryid'")->row();
//       echo $query3->id;
        $qry="SELECT `subcategoryid` FROM `categorysubcategory` WHERE `brandcategoryid` IN (SELECT `id` FROM `brandcategory` where `brandid`='$brandid' and `categoryid`='$categoryid')";
      //  echo $qry;
    $query=$this->db->query($qry)->result();
       $query2=$this->db->query("SELECT `id`,`name` FROM `subcategory`")->result();
//		print_r($query);
//        echo "<br><br>";
//		print_r($query2);
//        echo "<br><br>";
        foreach($query2 as $row)
		{
        $flag="";
                    foreach($query as $row2)
                {
                        if($row->id==$row2->subcategoryid)
                        {
                        $flag="checked";
                        break;
                        }
                        
                }
            array_push($subcategory,$row->name,$row->id,$flag);
            
		}
		//print_r($subcategory);
        return $subcategory;
//		return $query;
    
    
    }
    public function getbrandcategoryid($brandid,$categoryid)
    {
    $query3=$this->db->query("SELECT `id` FROM `brandcategory` where `brandid`='$brandid' and `categoryid`='$categoryid'")->row();
       return $query3->id;
    }
    public function editsubcategorysubmit($brandcategoryid,$subcategoryid)
    {
        $data  = array(
			'brandcategoryid' => $brandcategoryid,
			'subcategoryid' => $subcategoryid
		);
        $querya=$this->db->query("SELECT * FROM `categorysubcategory` WHERE `brandcategoryid`='$brandcategoryid' AND `subcategoryid`='$subcategoryid'")->result();
        if( $this->db->affected_rows() == 0)
        {
		$query=$this->db->insert( 'categorysubcategory', $data );
        }
		
    }
    public function deletesubcategorysubmit($brandcategoryid,$subcategoryid)
    {
        $sql="DELETE FROM `categorysubcategory` WHERE `brandcategoryid`='$brandcategoryid' AND `subcategoryid`='$subcategoryid'";
        echo $sql;
		$query=$this->db->query($sql);
		
    }
    //frontendapis
    
    function getallparentcategories()
	{
		$query=$this->db->query("SELECT `category`.`id`,`category`.`name`,`tab2`.`name` as `parent` 
        FROM `category` 
		LEFT JOIN `category` as `tab2` ON `tab2`.`id`=`category`.`parent`
        WHERE `category`.`parent`=0")->result();
		return $query;
	}
    public function getsubcategory($id)
	{
		$query=$this->db->query("SELECT * FROM `category` WHERE `parent`='$id'  ORDER BY `id` ASC")->result();
		
		return $query;
	}
    
}
?>