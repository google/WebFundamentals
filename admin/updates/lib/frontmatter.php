<?php
/**
 * PHP YAML FrontMatter Class
 * An easy to use class for handling YAML frontmatter in PHP.
 *
 * @author Blaxus
 * @package YAML-FrontMatter
 * @license http://unlicense.org UnLicense
 * @link https://github.com/Blaxus
 */
class FrontMatter
{
    /**
     * All the parameters.
     * @param array $data metadata & content
     */
    private $data;

    /**
     * Constructor method, checks a file and then puts the contents into custom strings for usage
     * @param string $file The input file
     */
    public function __construct($file)
    {
        $file = (file_exists($file)) ? $this->Read($file) : str_replace(array("\r\n", "\r", "\n"), "\n", $file);
        $this->yaml_separator = "---\n";
        $fm = $this->FrontMatter($file);

        foreach($fm as $key => $value)
        {
            $this->data[$key] = $value;
        }
    }

    /**
     * fetch method returns the value of a given key
     * @return string $value The value for a given key
     */
    public function fetch($key)
    {
        return $this->data[$key];
    }

    /**
     * keyExists method Checks to see if a key exists
     * @return bool
     */
    public function keyExists($key)
    {
        #return (isset($this->data[$key])) ? true : false; # Isset Version
        return array_key_exists($key, $this->data); # array_key_exists version
    }

    /**
     * fetchKeys method returns an array of all meta data without the content
     * @return [array] collection of all meta keys provided to FrontMatter
     */
    public function fetchKeys()
    {
        # Cache the keys so we don't edit the native object data
        $keys = $this->data;

        # Remove $data[content] from the keys so we only have the meta data
        array_pop($keys);

        return $keys;
    }

    /**
     * FrontMatter method, rturns all the variables from a YAML Frontmatter input
     * @param string $input The input string
     * @return array $final returns all variables in an array
     */
    function FrontMatter($input)
    {
        if (!$this->startsWith($input, $this->yaml_separator))
        {
            # No front matter
            # Store Content in Final array
            $final['content'] = $input;
            # Return Final array
            return $final;
        }

        # Explode Seperators. At most, make three pieces out of the input file
        $document = explode($this->yaml_separator,$input, 3);

        switch( sizeof($document) )
        {
            case 0:
            case 1:
                // Empty document
                $front_matter = "";
                $content = "";
                break;
            case 2:
                # Only front matter given
                $front_matter = $document[1];
                $content = "";
                break;
            default:
                # Normal document
                $front_matter = $document[1];
                $content = $document[2];
        }

        # Split lines in front matter to get variables
        $final = yaml_parse($front_matter);

        # Store Content in Final array
        $final['content'] = $content;

        # Return Final array
        return $final;
    }

    /**
     * A convenience wrapper around strpos to check the start of a string
     * From http://stackoverflow.com/a/860509/270334
     * @return boolean $startswithneedle string starts with $needle
     */
    private function startsWith($haystack,$needle,$case=true)
    {
        if($case)
            return strpos($haystack, $needle, 0) === 0;
        return stripos($haystack, $needle, 0) === 0;
    }

    /**
     * Read Method, Read file and returns it's contents
     * @return string $data returned data
     */
    protected function Read($file)
    {
        # Open File
        $fh = fopen($file, 'r');

        $fileSize = filesize($file);

        if(!empty($fileSize))
        {
            # Read Data
            $data = fread($fh, $fileSize);

            # Fix Data Stream to be the exact same format as PHP's strings
            $data = str_replace(array("\r\n", "\r", "\n"), "\n", $data);
        }
        else
        {
            $data = '';
        }

        # Close File
        fclose($fh);

        # Return Data
        return $data;
    }
}